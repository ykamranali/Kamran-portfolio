"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

export default function Vehicle() {
  const bodyRef = useRef<RapierRigidBody>(null);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  
  const v = new THREE.Vector3();
  const cameraPosition = new THREE.Vector3();

  useFrame((state, delta) => {
    if (!bodyRef.current) return;

    const { forward, backward, left, right } = getKeys();
    
    // Get current rotation and velocity
    const rotation = bodyRef.current.rotation();
    const velocity = bodyRef.current.linvel();
    
    // Create a forward vector based on current rotation
    const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(rotation);
    
    // Acceleration and steering speeds
    const speed = 40.0;
    const turnSpeed = 2.0;

    // Apply forces
    if (forward) {
      bodyRef.current.applyImpulse(forwardVector.multiplyScalar(speed * delta), true);
    }
    if (backward) {
      bodyRef.current.applyImpulse(forwardVector.multiplyScalar(-speed * delta), true);
    }

    // Apply torque for steering
    if (left) {
      bodyRef.current.applyTorqueImpulse({ x: 0, y: turnSpeed * delta, z: 0 }, true);
    }
    if (right) {
      bodyRef.current.applyTorqueImpulse({ x: 0, y: -turnSpeed * delta, z: 0 }, true);
    }

    // Camera follow
    const position = bodyRef.current.translation();
    
    // Calculate desired camera position (behind and above the car)
    const cameraOffset = new THREE.Vector3(0, 5, 10).applyQuaternion(rotation);
    cameraPosition.copy(position as THREE.Vector3).add(cameraOffset);
    
    // Smoothly interpolate camera position
    state.camera.position.lerp(cameraPosition, 5 * delta);
    
    // Camera looks at the car
    state.camera.lookAt(position.x, position.y, position.z);
  });

  return (
    <RigidBody 
      ref={bodyRef} 
      colliders="cuboid" 
      mass={1} 
      position={[0, 1, 0]}
      linearDamping={1.5}
      angularDamping={2.0}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#8A2EFF" />
      </mesh>
      {/* Front wheels */}
      <mesh position={[-1.2, -0.5, -1.5]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.2, -0.5, -1.5]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Rear wheels */}
      <mesh position={[-1.2, -0.5, 1.5]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.2, -0.5, 1.5]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </RigidBody>
  );
}
