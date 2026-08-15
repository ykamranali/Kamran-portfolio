import re

def update_portfolio():
    file_path = r'd:\Kamran Projects\Kamran portfolio\src\sections\projects.tsx'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add FaTv import
    if "FaTv" not in content:
        content = content.replace(
            'import { FaServer, FaRobot, FaStethoscope, FaShieldAlt, FaCogs, FaBrain, FaArrowRight } from "react-icons/fa";',
            'import { FaServer, FaRobot, FaStethoscope, FaShieldAlt, FaCogs, FaBrain, FaArrowRight, FaTv } from "react-icons/fa";'
        )

    # Insert Omni Signage as the first project
    if "Omni Signage" not in content:
        old_projects = """const projects = [
  { title: "Omni AI", description: "The core intelligence nexus powering all autonomous modules.", icon: <FaBrain /> },"""
        new_projects = """const projects = [
  { title: "Omni Signage", description: "Next-generation 3D digital signage CMS for any browser.", icon: <FaTv />, link: "https://web-iota-six-94wk94cj1a.vercel.app/" },
  { title: "Omni AI", description: "The core intelligence nexus powering all autonomous modules.", icon: <FaBrain /> },"""
        content = content.replace(old_projects, new_projects)

    # Update click handler
    old_click = "onClick={() => alert(`Detailed case study for ${project.title} is coming soon!`)}"
    new_click = "onClick={() => project.link ? window.open(project.link, '_blank') : alert(`Detailed case study for ${project.title} is coming soon!`)}"
    content = content.replace(old_click, new_click)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Portfolio updated.")

if __name__ == '__main__':
    update_portfolio()
