import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, Phone, Search, 
  Stethoscope, MapPin, FileText, Upload, Video, 
  Plus, FilePlus, AlertCircle, Award, Sparkles, Smile, 
  Scissors, Printer, Star, Image, ThumbsUp, CheckCircle2, 
  ExternalLink, PhoneOff, Trash2, Download, Check, RefreshCw, X
} from 'lucide-react';

export default function DentalClinicApp() {
  const [activeTab, setActiveTab] = useState('reviews'); // 'reviews' | 'photos' | 'records' | 'services' | 'appointments' | 'video' | 'add'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [photoFilter, setPhotoFilter] = useState('All');
  const [callActive, setCallActive] = useState(false);

  // Custom Public Link
  const GOOGLE_MAPS_URL = "https://share.google/vFd746LimKXUKZJ7d";

  // Doctors Database
  const doctors = [
    {
      id: "dr-pramod",
      name: "Dr. Pramod Kumar",
      qualifications: "BDS, NDC, NHA",
      experience: "Ex. Attach - IGIMS",
      regNo: "12016/A",
      role: "Dental Surgeon",
      avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "dr-shivangi",
      name: "Dr. Shivangi Kriti",
      qualifications: "BDS, NDC, NHA, FFAC",
      experience: "Ex. Attach - IGIMS",
      regNo: "11389/A",
      role: "Dental Surgeon & Facial Aesthetic Specialist",
      avatarUrl: "https://images.unsplash.com/photo-1594824813566-7885a3964670?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "dr-sumit",
      name: "Dr. Sumit Verma",
      qualifications: "MDS",
      experience: "Oral & Maxillofacial Specialist",
      regNo: "Consultant",
      role: "Oral Surgeon",
      avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80"
    }
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);

  // Google Patient Reviews Data
  const googleReviews = [
    {
      id: 1,
      author: "Rahul Sharma",
      rating: 5,
      time: "2 weeks ago",
      text: "Dr. Pramod Kumar explained the root canal process step-by-step. Painless treatment and very hygienic clinic setup near Ram Krishna Nagar bypass. Highly recommended!",
      likes: 12,
      verified: true
    },
    {
      id: 2,
      author: "Veena Kumari",
      rating: 5,
      time: "1 month ago",
      text: "Extremely professional behavior from Dr. Shivangi Kriti during my teeth whitening and facial aesthetic consultation. The environment is warm and welcoming.",
      likes: 8,
      verified: true
    },
    {
      id: 3,
      author: "Amit Kumar",
      rating: 5,
      time: "2 months ago",
      text: "Got my wisdom tooth extracted by Dr. Sumit Verma. Completely painless surgical procedure. Modern equipment and spotless cleanliness.",
      likes: 15,
      verified: true
    },
    {
      id: 4,
      author: "Priya Roy",
      rating: 5,
      time: "3 months ago",
      text: "Best dental clinic in Patna! The doctors take time to listen to patient problems and do not rush through appointments. Very satisfied with the crown fitting.",
      likes: 6,
      verified: true
    }
  ];

  // Gallery Photos Data
  const clinicPhotos = [
    { id: 1, title: "Modern Clinical Operatory", category: "Interior", url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=80" },
    { id: 2, title: "Reception & Patient Waiting Lounge", category: "Interior", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80" },
    { id: 3, title: "Ultrasonic Scaling & Dental Chair Setup", category: "Equipment", url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80" },
    { id: 4, title: "Sterilized Surgical Instruments Room", category: "Equipment", url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80" },
    { id: 5, title: "Clinic Exterior Entrance - Ram Krishna Nagar", category: "Exterior", url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80" },
    { id: 6, title: "Laser Dentistry & Cosmetic Unit", category: "Equipment", url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&auto=format&fit=crop&q=80" }
  ];

  // Clinical Services Data
  const servicesList = [
    {
      category: "General & Preventative",
      icon: <Stethoscope className="w-5 h-5 text-teal-600" />,
      lead: "Dr. Pramod Kumar",
      defaultTreatment: "General Checkup",
      items: [
        "Comprehensive Oral Checkup & Digital Diagnosis",
        "Scaling & Ultrasonic Teeth Cleaning",
        "Tooth-Colored Filling & Composite Restorations",
        "Fluoride Application & Dental Cavity Prevention"
      ]
    },
    {
      category: "Endodontics & Restorative",
      icon: <Smile className="w-5 h-5 text-teal-600" />,
      lead: "Dr. Pramod Kumar",
      defaultTreatment: "Root Canal Treatment",
      items: [
        "Root Canal Treatment (RCT) - Single & Multi Visit",
        "Zirconia & Ceramic Crown Placement",
        "Bridge Restorations for Missing Teeth",
        "Complete & Removable Partial Dentures"
      ]
    },
    {
      category: "Facial Aesthetics & Cosmetics",
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      lead: "Dr. Shivangi Kriti",
      defaultTreatment: "Facial Aesthetic & Whitening",
      items: [
        "Facial Aesthetic Treatments (FFAC Certified)",
        "Laser Teeth Whitening & Bleaching",
        "Smile Designing & Diastema Gap Closure",
        "Dental Veneers & Cosmetic Laminates"
      ]
    },
    {
      category: "Oral & Maxillofacial Surgery",
      icon: <Scissors className="w-5 h-5 text-amber-600" />,
      lead: "Dr. Sumit Verma",
      defaultTreatment: "Oral & Maxillofacial Surgery",
      items: [
        "Painless Tooth Extractions",
        "Surgical Impaction & Wisdom Teeth Removal",
        "Maxillofacial Trauma & Jaw Surgery",
        "Minor Oral Surgical Procedures"
      ]
    }
  ];

  // Patient Records State
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      age: 32,
      gender: "Male",
      phone: "+91 98765 43210",
      treatment: "Root Canal Treatment",
      doctorName: "Dr. Pramod Kumar",
      time: "10:00 AM",
      status: "Confirmed",
      prescriptions: [
        { name: "Tab. Amoxicillin 500mg", dosage: "1 cap - 0 - 1 cap (After food)", duration: "5 Days", date: "2026-08-01", prescribedBy: "Dr. Pramod Kumar (Reg: 12016/A)" },
        { name: "Tab. Ketorolac 10mg", dosage: "1 tab as needed for pain", duration: "3 Days", date: "2026-08-01", prescribedBy: "Dr. Pramod Kumar (Reg: 12016/A)" }
      ],
      uploadedFiles: ["XRay_Molar_Lower.pdf"]
    },
    {
      id: 2,
      name: "Ananya Roy",
      age: 26,
      gender: "Female",
      phone: "+91 98123 45678",
      treatment: "Facial Aesthetic & Whitening",
      doctorName: "Dr. Shivangi Kriti",
      time: "11:30 AM",
      status: "In Progress",
      prescriptions: [
        { name: "Chlorhexidine 0.2% Mouthwash", dosage: "Rinse 10ml twice daily", duration: "7 Days", date: "2026-08-02", prescribedBy: "Dr. Shivangi Kriti (Reg: 11389/A)" }
      ],
      uploadedFiles: []
    }
  ]);

  const [newPatient, setNewPatient] = useState({
    name: '', age: '', gender: 'Male', treatment: 'General Checkup', assignedDoctor: doctors[0].name, time: '10:00 AM', phone: ''
  });

  const [newRx, setNewRx] = useState({ medicine: '', dosage: '', duration: '5 Days' });

  // Escape listener for print modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showPrintModal) {
        setShowPrintModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPrintModal]);

  const handleBookService = (treatmentName, leadDoctorName) => {
    setNewPatient(prev => ({
      ...prev,
      treatment: treatmentName,
      assignedDoctor: leadDoctorName
    }));
    setActiveTab('add');
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (!newPatient.name) return;
    setPatients([...patients, {
      id: Date.now(),
      name: newPatient.name,
      age: newPatient.age || 30,
      gender: newPatient.gender,
      phone: newPatient.phone,
      treatment: newPatient.treatment,
      doctorName: newPatient.assignedDoctor,
      time: newPatient.time,
      status: "Confirmed",
      prescriptions: [],
      uploadedFiles: []
    }]);
    setNewPatient({ name: '', age: '', gender: 'Male', treatment: 'General Checkup', assignedDoctor: doctors[0].name, time: '10:00 AM', phone: '' });
    setActiveTab('appointments');
  };

  const handleDeleteAppointment = (patientId) => {
    setPatients(patients.filter(p => p.id !== patientId));
    if (selectedPatient?.id === patientId) {
      setSelectedPatient(null);
    }
  };

  const handleUpdateStatus = (patientId, newStatus) => {
    setPatients(patients.map(p => p.id === patientId ? { ...p, status: newStatus } : p));
  };

  const handleExportPatientRecord = (patient) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(patient, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${patient.name.replace(/\s+/g, '_')}_EHR_Record.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleAddPrescription = (patientId) => {
    if (!newRx.medicine) return;
    setPatients(patients.map(p => p.id === patientId ? {
      ...p,
      prescriptions: [...p.prescriptions, { 
        name: newRx.medicine, 
        dosage: newRx.dosage || '1 tab 2x daily after food',
        duration: newRx.duration || '5 Days', 
        date: new Date().toISOString().split('T')[0], 
        prescribedBy: `${selectedDoctor.name} (${selectedDoctor.qualifications})` 
      }]
    } : p));
    setNewRx({ medicine: '', dosage: '', duration: '5 Days' });
  };

  const handleFileUpload = (patientId, e) => {
    const file = e.target.files[0];
    if (file) {
      setPatients(patients.map(p => p.id === patientId ? {
        ...p,
        uploadedFiles: [...p.uploadedFiles, file.name]
      } : p));
    }
  };

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPhotos = photoFilter === 'All' 
    ? clinicPhotos 
    : clinicPhotos.filter(photo => photo.category === photoFilter);

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Top Header Bar */}
      <header className="bg-teal-800 text-white shadow-md p-4 sticky top-0 z-20 print:hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-700 rounded-xl shadow-inner">
              <Stethoscope className="w-8 h-8 text-teal-100" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-wide">
                PRAKRITI DENTAL CARE <span className="text-teal-200 font-normal text-sm md:text-base">cum ORAL & MAXILLOFACIAL SURGERY CENTER</span>
              </h1>
              <div className="flex items-center gap-3 mt-1 text-xs text-teal-200 font-medium">
                <a 
                  href={GOOGLE_MAPS_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 text-teal-200 hover:text-white transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-300" /> Ram Krishna Nagar Bypass, Patna <ExternalLink className="w-3 h-3 text-teal-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Active Doctor Selector */}
          <div className="bg-teal-900/90 p-2 rounded-xl border border-teal-700 flex items-center gap-3 w-full md:w-auto">
            <img 
              src={selectedDoctor.avatarUrl} 
              alt={selectedDoctor.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-teal-400 shadow-sm"
            />
            <div className="text-xs">
              <div className="text-teal-300 font-semibold text-[10px] uppercase tracking-wider">Active Prescribing Doctor</div>
              <select 
                value={selectedDoctor.id}
                onChange={(e) => setSelectedDoctor(doctors.find(d => d.id === e.target.value))}
                className="bg-teal-800 text-white text-xs font-semibold rounded px-2 py-1 mt-0.5 outline-none focus:ring-1 focus:ring-teal-400 border border-teal-600"
              >
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} ({doc.role})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Clinical Team Cards */}
      <section className="bg-white border-b border-slate-200 py-4 px-4 shadow-sm print:hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-teal-600" /> Executive Medical Panel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {doctors.map((doc) => (
              <div 
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  selectedDoctor.id === doc.id ? 'border-teal-500 bg-teal-50/50 ring-2 ring-teal-500/20' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <img 
                  src={doc.avatarUrl} 
                  alt={doc.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                />
                <div className="text-xs">
                  <h3 className="font-bold text-slate-900 text-sm">{doc.name}</h3>
                  <p className="text-teal-700 font-medium text-[11px]">{doc.qualifications}</p>
                  <p className="text-slate-500 text-[10px]">{doc.experience} • Reg: {doc.regNo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Area */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 print:hidden">
        {/* Navigation Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 sticky top-[72px] z-10">
          <div className="flex flex-wrap gap-2 border-b md:border-b-0 w-full md:w-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3.5 py-2 font-medium text-sm rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'reviews' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Google Reviews
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-3.5 py-2 font-medium text-sm rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'photos' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Image className="w-4 h-4" /> Clinic Gallery
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`px-3.5 py-2 font-medium text-sm rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'records' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" /> EHR & Prescriptions
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-3.5 py-2 font-medium text-sm rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'services' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Services
            </button>
            <button
              onClick={() => { setActiveTab('appointments'); setSelectedPatient(null); }}
              className={`px-3.5 py-2 font-medium text-sm rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'appointments' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" /> Appointments ({patients.length})
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3.5 py-2 font-medium text-sm rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'video' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Video className="w-4 h-4" /> Tele-Consultation
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-3.5 py-2 font-medium text-sm rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'add' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Plus className="w-4 h-4" /> Book Visit
            </button>
          </div>

          {activeTab !== 'add' && activeTab !== 'services' && activeTab !== 'reviews' && activeTab !== 'photos' && (
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search patient or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          )}
        </div>

        {/* TAB 1: GOOGLE REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-teal-50 rounded-2xl flex flex-col items-center justify-center border border-teal-200 shadow-inner">
                  <span className="text-3xl font-extrabold text-teal-900">5.0</span>
                  <div className="flex text-amber-400 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Google Verified Patient Rating</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Based on 210+ patient ratings across web profiles</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% Positive Feedback
                    </span>
                    <span className="text-xs text-slate-400">• Ram Krishna Nagar, Patna</span>
                  </div>
                </div>
              </div>

              <a 
                href={GOOGLE_MAPS_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors"
              >
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" /> View / Write Google Review
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {googleReviews.map((rev) => (
                <div key={rev.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 hover:border-teal-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-700 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          {rev.author}
                          {rev.verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                          )}
                        </h3>
                        <p className="text-[11px] text-slate-400">{rev.time}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{rev.text}</p>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                    <ThumbsUp className="w-3 h-3 text-teal-600" />
                    <span>{rev.likes} patients found this helpful</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CLINIC PHOTOS GALLERY */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Prakriti Dental Care Gallery</h2>
                <p className="text-xs text-slate-500">Operatory units, sterilization room, and patient lounges</p>
              </div>

              <div className="flex gap-2 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                {['All', 'Interior', 'Equipment', 'Exterior'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPhotoFilter(cat)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      photoFilter === cat ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <img 
                      src={photo.url} 
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {photo.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-slate-800 text-xs">{photo.title}</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Prakriti Dental Care • Patna</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EHR & ONLINE PRESCRIPTION RECORD */}
        {activeTab === 'records' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                Patient Directory
              </h2>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredPatients.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatient(p)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedPatient?.id === p.id 
                        ? 'border-teal-500 bg-teal-50/60 shadow-sm' 
                        : 'border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-semibold text-slate-800 text-sm">{p.name}</div>
                    <div className="text-xs text-teal-700 font-medium">{p.treatment}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Doctor: {p.doctorName}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{p.prescriptions.length} Prescriptions • {p.uploadedFiles.length} Uploads</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              {selectedPatient ? (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{selectedPatient.name}</h2>
                      <p className="text-xs text-slate-500">Prakriti EHR Record ID: #PDK-2026-{selectedPatient.id} • Assigned: <strong className="text-slate-700">{selectedPatient.doctorName}</strong></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExportPatientRecord(selectedPatient)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" /> Export Record
                      </button>
                      <button
                        onClick={() => setShowPrintModal(true)}
                        className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Printer className="w-4 h-4" /> Print / Download Rx
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                      <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                        <FilePlus className="w-4 h-4 text-teal-600" /> Write Prescription
                      </h3>
                      <span className="text-[11px] text-teal-800 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        Prescriber: {selectedDoctor.name} ({selectedDoctor.qualifications})
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Medicine Name (e.g. Amoxicillin 500mg)"
                        value={newRx.medicine}
                        onChange={(e) => setNewRx({ ...newRx, medicine: e.target.value })}
                        className="px-3 py-1.5 text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                      <input
                        type="text"
                        placeholder="Dosage (e.g. 1 cap 2x daily after food)"
                        value={newRx.dosage}
                        onChange={(e) => setNewRx({ ...newRx, dosage: e.target.value })}
                        className="px-3 py-1.5 text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g. 5 Days)"
                        value={newRx.duration}
                        onChange={(e) => setNewRx({ ...newRx, duration: e.target.value })}
                        className="px-3 py-1.5 text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <button
                      onClick={() => handleAddPrescription(selectedPatient.id)}
                      className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-md transition-colors shadow-sm"
                    >
                      Save & Log Rx under {selectedDoctor.name}
                    </button>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-2">Prescription History</h3>
                    {selectedPatient.prescriptions.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No active prescriptions recorded.</p>
                    ) : (
                      <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                            <tr>
                              <th className="p-2.5">Medicine</th>
                              <th className="p-2.5">Dosage</th>
                              <th className="p-2.5">Duration</th>
                              <th className="p-2.5">Prescribed By</th>
                              <th className="p-2.5">Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {selectedPatient.prescriptions.map((rx, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="p-2.5 font-medium text-slate-800">{rx.name}</td>
                                <td className="p-2.5 text-slate-600">{rx.dosage}</td>
                                <td className="p-2.5 text-slate-600">{rx.duration || '5 Days'}</td>
                                <td className="p-2.5 text-slate-600 font-medium">{rx.prescribedBy}</td>
                                <td className="p-2.5 text-slate-400">{rx.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-teal-600" /> Upload X-Rays / Clinical Documents
                    </h3>
                    
                    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-teal-200 hover:border-teal-400 bg-teal-50/30 rounded-xl cursor-pointer transition-colors mb-3">
                      <Upload className="w-6 h-6 text-teal-600 mb-1" />
                      <span className="text-xs font-semibold text-teal-800">Click to attach X-Ray or Document PDF</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">Supports PNG, JPG, PDF up to 10MB</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(selectedPatient.id, e)}
                      />
                    </label>

                    {selectedPatient.uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-slate-600">Attached Files:</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedPatient.uploadedFiles.map((file, i) => (
                            <div key={i} className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-md">
                              <FileText className="w-3.5 h-3.5 text-teal-600" />
                              <span>{file}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-16 text-slate-400">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-medium">Select a patient to manage records, export EHR, or print digital Rx slips.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CLINICAL SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Services & Procedures</h2>
              <p className="text-xs text-slate-500">Comprehensive dental and oral surgical care delivered by our specialist doctors.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesList.map((srv, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 hover:border-teal-300 transition-colors">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-teal-50 rounded-lg">
                        {srv.icon}
                      </div>
                      <h3 className="font-bold text-slate-800 text-base">{srv.category}</h3>
                    </div>
                    <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                      Lead: {srv.lead}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600">
                    {srv.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleBookService(srv.defaultTreatment, srv.lead)}
                    className="w-full py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-semibold rounded-lg border border-teal-200 transition-colors mt-2"
                  >
                    Book Treatment Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="grid gap-4">
            {filteredPatients.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500 font-medium">No patient appointments found.</p>
              </div>
            ) : (
              filteredPatients.map((patient) => (
                <div key={patient.id} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-teal-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-50 text-teal-700 rounded-full font-bold flex items-center justify-center min-w-12 h-12">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{patient.name} <span className="text-xs text-slate-400 font-normal">({patient.age} yrs / {patient.gender})</span></h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded">{patient.treatment}</span>
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Attending: {patient.doctorName}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {patient.time}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {patient.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Toggle Buttons */}
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
                      <button
                        onClick={() => handleUpdateStatus(patient.id, 'Confirmed')}
                        className={`px-2 py-1 rounded-md flex items-center gap-1 transition-colors ${
                          patient.status === 'Confirmed' ? 'bg-emerald-600 text-white font-medium shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Mark as Confirmed"
                      >
                        <Check className="w-3 h-3" /> Confirmed
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(patient.id, 'In Progress')}
                        className={`px-2 py-1 rounded-md flex items-center gap-1 transition-colors ${
                          patient.status === 'In Progress' ? 'bg-amber-500 text-white font-medium shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Mark as In Progress"
                      >
                        <RefreshCw className="w-3 h-3" /> Active
                      </button>
                    </div>

                    <button
                      onClick={() => { setSelectedPatient(patient); setActiveTab('records'); }}
                      className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium flex items-center gap-1 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" /> EHR
                    </button>

                    <button
                      onClick={() => handleDeleteAppointment(patient.id)}
                      className="text-xs p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Cancel/Delete Appointment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 6: TELE-CONSULTATION */}
        {activeTab === 'video' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Video className="w-5 h-5 text-teal-600" /> Tele-Dentistry Virtual Clinic
                </h2>
                <p className="text-xs text-slate-500">Prakriti Dental Care • Remote Consultation Room</p>
              </div>

              <div className="text-xs font-semibold bg-teal-50 text-teal-800 px-3 py-1 rounded-full border border-teal-200">
                Host: {selectedDoctor.name} ({selectedDoctor.role})
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video relative flex items-center justify-center text-white shadow-inner">
              <div className="text-center space-y-3 z-10">
                <img 
                  src={selectedDoctor.avatarUrl} 
                  alt={selectedDoctor.name} 
                  className={`w-20 h-20 rounded-full object-cover mx-auto border-2 border-teal-400 shadow-lg ${
                    callActive ? 'ring-4 ring-emerald-500 animate-pulse' : ''
                  }`} 
                />
                <div>
                  <h3 className="font-semibold text-base">{selectedDoctor.name}'s Virtual Room</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedDoctor.qualifications} • {selectedDoctor.experience}</p>
                </div>

                <button 
                  onClick={() => setCallActive(!callActive)}
                  className={`px-5 py-2 text-xs font-semibold rounded-lg shadow-md transition-colors flex items-center gap-2 mx-auto ${
                    callActive 
                      ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                      : 'bg-teal-600 hover:bg-teal-500 text-white'
                  }`}
                >
                  {callActive ? (
                    <>
                      <PhoneOff className="w-4 h-4" /> End Consultation
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4" /> Start Video Consultation
                    </>
                  )}
                </button>
              </div>

              <div className="absolute top-4 left-4 bg-slate-800/80 px-3 py-1 rounded-full text-xs border border-slate-700 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${callActive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
                <span>{callActive ? 'Call in Progress (Live)' : 'Camera & Mic Ready'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-800">Scheduled Tele-Consultations Today</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {patients.slice(0, 2).map((p) => (
                  <div key={p.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-xs text-slate-800">{p.name}</p>
                      <p className="text-[11px] text-teal-700">{p.treatment}</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">Assigned: {p.doctorName}</p>
                    </div>
                    <button 
                      onClick={() => setCallActive(true)}
                      className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
                    >
                      <Video className="w-3 h-3" /> Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: BOOK APPOINTMENT FORM */}
        {activeTab === 'add' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-xl mx-auto">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" /> Book Patient Visit
              </h2>
              <p className="text-xs text-slate-500">Prakriti Dental Care • Scheduling Desk</p>
            </div>

            <form onSubmit={handleAddAppointment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter patient full name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Age</label>
                  <input
                    type="number"
                    placeholder="e.g. 32"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Assign Doctor</label>
                <select
                  value={newPatient.assignedDoctor}
                  onChange={(e) => setNewPatient({ ...newPatient, assignedDoctor: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none font-medium text-slate-800 bg-slate-50"
                >
                  {doctors.map(doc => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} ({doc.qualifications}) - {doc.role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Treatment Type</label>
                  <select
                    value={newPatient.treatment}
                    onChange={(e) => setNewPatient({ ...newPatient, treatment: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option>General Checkup</option>
                    <option>Scaling & Cleaning</option>
                    <option>Root Canal Treatment</option>
                    <option>Crown Placement</option>
                    <option>Teeth Extraction</option>
                    <option>Oral & Maxillofacial Surgery</option>
                    <option>Facial Aesthetic & Whitening</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Time Slot</label>
                  <select
                    value={newPatient.time}
                    onChange={(e) => setNewPatient({ ...newPatient, time: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option>10:00 AM</option>
                    <option>11:30 AM</option>
                    <option>02:00 PM</option>
                    <option>04:15 PM</option>
                    <option>06:00 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm rounded-lg transition-colors mt-2 shadow-sm"
              >
                Confirm Appointment Registration
              </button>
            </form>
          </div>
        )}

      </main>

      {/* PRINTABLE PRESCRIPTION MODAL / SLIP VIEW */}
      {showPrintModal && selectedPatient && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 space-y-6 shadow-2xl relative border border-slate-300">
            <div className="flex justify-between items-center border-b pb-4 print:hidden">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Official Digital Rx Preview</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleTriggerPrint}
                  className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-4 h-4" /> Print / Save PDF
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Close (Esc)
                </button>
              </div>
            </div>

            <div className="space-y-6 text-slate-800 p-2 font-serif">
              <div className="border-b-2 border-teal-800 pb-4 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h1 className="text-xl font-bold text-teal-900 tracking-wide font-sans">
                    PRAKRITI DENTAL CARE
                  </h1>
                  <p className="text-xs font-bold text-teal-700 font-sans">
                    cum ORAL & MAXILLOFACIAL SURGERY CENTER
                  </p>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5">📍 Ram Krishna Nagar Bypass, Patna, Bihar</p>
                </div>
                <div className="text-right text-[11px] font-sans text-slate-700 space-y-0.5 border-l sm:border-l-0 pl-3 sm:pl-0 border-teal-800">
                  <p><strong>Dr. Pramod Kumar</strong> | BDS, NDC, NHA (Reg: 12016/A)</p>
                  <p><strong>Dr. Shivangi Kriti</strong> | BDS, NDC, NHA, FFAC (Reg: 11389/A)</p>
                  <p><strong>Dr. Sumit Verma</strong> | MDS (Oral Surgeon)</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-sans grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div><span className="text-slate-400">Patient:</span> <strong>{selectedPatient.name}</strong></div>
                <div><span className="text-slate-400">Age/Gender:</span> <strong>{selectedPatient.age} Yrs / {selectedPatient.gender}</strong></div>
                <div><span className="text-slate-400">Procedure:</span> <strong>{selectedPatient.treatment}</strong></div>
                <div><span className="text-slate-400">Date:</span> <strong>{new Date().toISOString().split('T')[0]}</strong></div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="text-xl font-bold text-teal-900 font-sans italic">Rx</div>
                {selectedPatient.prescriptions.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No active medications added to prescription.</p>
                ) : (
                  <ol className="list-decimal list-inside space-y-3 text-xs font-sans">
                    {selectedPatient.prescriptions.map((rx, idx) => (
                      <li key={idx} className="border-b border-slate-100 pb-2">
                        <span className="font-bold text-slate-900 text-sm">{rx.name}</span>
                        <div className="pl-5 text-slate-600 mt-0.5">
                          <span>Dosage: {rx.dosage}</span> • <span className="font-medium text-teal-800">Duration: {rx.duration || '5 Days'}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              <div className="border-t border-slate-200 pt-4 text-[11px] font-sans text-slate-500 space-y-1">
                <p><strong>Instructions:</strong> Take medications after food unless specified otherwise. Maintain oral hygiene and contact the clinic for emergencies.</p>
              </div>

              <div className="pt-12 flex justify-end font-sans text-right">
                <div className="border-t border-slate-400 pt-1 min-w-[180px]">
                  <p className="text-xs font-bold text-slate-900">{selectedDoctor.name}</p>
                  <p className="text-[10px] text-slate-500">{selectedDoctor.qualifications}</p>
                  <p className="text-[10px] text-teal-800">Reg. No: {selectedDoctor.regNo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
