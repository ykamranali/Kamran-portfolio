const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream('public/resume.pdf'));

// Colors
const primary = '#06b6d4'; // Cyan
const dark = '#111827';
const gray = '#4b5563';
const lightGray = '#9ca3af';

// Header
doc.fontSize(28).fillColor(dark).font('Helvetica-Bold').text('Kamran Ali', { align: 'center' });
doc.moveDown(0.2);
doc.fontSize(12).fillColor(primary).font('Helvetica').text('ICT Engineer | Cyber Security Consultant | AI Systems Architect', { align: 'center' });
doc.moveDown(0.5);
doc.fontSize(10).fillColor(gray).text('Founder of Omni Digital Solutions • Building the future of Autonomous Intelligence.', { align: 'center' });
doc.moveDown(2);

// Divider
doc.moveTo(50, doc.y).lineTo(550, doc.y).lineWidth(1).strokeColor(lightGray).stroke();
doc.moveDown(1.5);

// Evolution (Timeline)
doc.fontSize(16).fillColor(dark).font('Helvetica-Bold').text('Professional Evolution');
doc.moveDown(0.5);

const timeline = [
  { year: "2025", title: "Founder Omni AI", desc: "Building autonomous agents and intelligent networks for the future." },
  { year: "2024", title: "AI Builder", desc: "Synthesized hardware and software expertise into Artificial Intelligence." },
  { year: "2022", title: "Cyber Security", desc: "Deep dive into security protocols, zero trust, and threat mitigation." },
  { year: "2020", title: "ICT Engineer", desc: "Managed enterprise-grade information and communication technologies." },
  { year: "2018", title: "Network Engineer", desc: "Architected scalable network infrastructure and routing protocols." },
  { year: "2016", title: "IT Support", desc: "Transitioned to digital systems. Resolved critical user issues." },
  { year: "2014", title: "Electrician", desc: "Mastered hardware, electrical systems, and complex physical troubleshooting." },
];

timeline.forEach(item => {
  doc.fontSize(12).fillColor(primary).font('Helvetica-Bold').text(item.year, { continued: true });
  doc.fillColor(dark).text(` - ${item.title}`);
  doc.fontSize(10).fillColor(gray).font('Helvetica').text(item.desc);
  doc.moveDown(0.5);
});

doc.moveDown(1);
doc.moveTo(50, doc.y).lineTo(550, doc.y).lineWidth(1).strokeColor(lightGray).stroke();
doc.moveDown(1.5);

// Skills
doc.fontSize(16).fillColor(dark).font('Helvetica-Bold').text('Core Arsenal (Skills)');
doc.moveDown(0.5);
doc.fontSize(10).fillColor(gray).font('Helvetica').text(
  "Linux • Docker • Python • Next.js • Fortinet • Cisco • Mikrotik • Ubuntu • Windows Server • Azure • OpenAI • LLMs • Automation • Cyber Security • Networking • AI Agents • Supabase • Node.js",
  { lineGap: 4 }
);

doc.moveDown(2);
doc.moveTo(50, doc.y).lineTo(550, doc.y).lineWidth(1).strokeColor(lightGray).stroke();
doc.moveDown(1.5);

// Projects
doc.fontSize(16).fillColor(dark).font('Helvetica-Bold').text('System Architecture (Projects)');
doc.moveDown(0.5);

const projects = [
  { title: "Omni AI", desc: "The core intelligence nexus powering all autonomous modules." },
  { title: "Enterprise AI Platform", desc: "Scalable LLM infrastructure for corporate data reasoning." },
  { title: "Telegram AI Assistant", desc: "Real-time conversational agent with deep API integrations." },
  { title: "Healthcare Infrastructure", desc: "Secure, compliant networks optimized for medical data transit." },
  { title: "Cyber Security", desc: "Zero-trust architectures blocking millions of unauthorized access attempts." },
  { title: "Automation", desc: "Robotic Process Automation saving thousands of human hours." },
];

projects.forEach(item => {
  doc.fontSize(11).fillColor(dark).font('Helvetica-Bold').text(`• ${item.title}`);
  doc.fontSize(10).fillColor(gray).font('Helvetica').text(`  ${item.desc}`);
  doc.moveDown(0.3);
});

doc.moveDown(2);

// Contact
doc.fontSize(12).fillColor(primary).font('Helvetica-Bold').text('Connect: https://www.linkedin.com/in/kamran-ali-gul-saeed-4891a7b4/', { align: 'center' });

doc.end();

console.log("Resume generated successfully at public/resume.pdf");
