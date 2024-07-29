import React, { useState, useRef, useEffect } from 'react';
import one from "../../assets/one.png";
import projectUploadIcon from "../../assets/project-upload.png";
import { IoIosArrowForward } from 'react-icons/io';
import { BiCommentError } from "react-icons/bi";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { MdOutlineImage } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import Loading from '../Loding/Loding';

const Table7 = () => {
  const [action, setAction] = useState('service');
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [validationError, setValidationError] = useState("");
  const [serviceData, setServicedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [chequeData, setChequeData] = useState([]);


  const popupRef = useRef();
  const fileInputRef = useRef();

  const location = useLocation();
  const pathname = location.pathname;
  const projectUrl = decodeURIComponent(pathname.substring(pathname.lastIndexOf("/") + 1));

  console.log("projectUrl", projectUrl);
  const serviceLog = () => {
    setAction('service');
  };

  const chequeLog = () => {
    setAction('cheque');
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = () => {
    if (!projectName || !projectAddress || !uploadedImage) {
      setValidationError("All fields are required.");
      return;
    }

    const newProject = {
      name: projectName,
      address: projectAddress,
      image: uploadedImage,
    };

    // Reset form and close popup
    setUploadedImage(null);
    setProjectName("");
    setProjectAddress("");
    setShowPopup(false);
    setValidationError("");
    console.log("Project added:", newProject);
  };

  const fetchData = async () => {
    const sendData = {
      name: projectUrl
    }
    try {
      setLoading(true)
      const res = await axios.post("https://project-rof.vercel.app/api/seviceRequest/ProjectFilter", sendData);
      setServicedata(res.data);
      // console.log(res.data);

      const res1 = await axios.post("https://project-rof.vercel.app/api/projects/ProjectFilter", sendData);
      setProjectData(res1.data);
      // console.log(res1.data);

      const res2 = await axios.post("https://project-rof.vercel.app/api/chequeImage/entries-with-cheque-image", sendData);
      setChequeData(res2.data);
      console.log(res2.data);

      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  }


  useEffect(() => {
    fetchData();
  }, []);

  console.log("chequeData", chequeData);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const serviceLogData = [
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Shankar S', servicePersonNo: '9849414642', status: 'Resolved', feedback: '★', comments: 'Satisfied' },
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Shankar S', servicePersonNo: '9849414642', status: 'Pending', feedback: '★', comments: 'Satisfied' },
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Shankar S', servicePersonNo: '9849414642', status: 'Disputed', feedback: '★', comments: 'Satisfied' },
    // ... other data entries
  ];

  const chequedata = [
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', id: 'ROF001', mobile: '8444954154' },
    // ... other data entries
  ];

  // Data Time
  const DateupdatedAt = (DateupdatedAt) => {
    const formattedDate = format(new Date(DateupdatedAt), "dd MMM | hh:mm a");
    return formattedDate;
  };


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="wrapper" style={{ overflow: 'hidden' }}>
          <div className="bg-[#F7F3E8] p-4">
            <div className="flex items-center text-black" style={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "500" }}>
              <span>Home</span>
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <Link to='/Project'>
                <span className="font-semibold" style={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "400" }}>{projectUrl}</span>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row mb-6 items-center justify-center gap-[24px]">
            <div className="relative mb-4 md:mb-0 md:w-[619px] h-[48px] mt-4 ">
                <input
                  className="w-[619px] h-[48px] py-2 px-12 rounded-full"
                  style={{ border: "1px solid #3D2314", boxShadow: "0px 0px 4px 0px #00000040" }}
                  type="text"
                  placeholder="Search"
                />
                <img
                  style={{ top: "0.6rem" }}
                  src={Searchsvg}
                  alt="Search"
                  className="absolute left-4"
                />
              </div>
              <div>
              <button
                className="bg-[#3D2314] text-white px-4 py-2 rounded-3xl w-[220px] mt-[11px]"
                onClick={() => setShowPopup(true)}
              >+ Add new Project</button>
              </div>
           
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden w-[1130px] h-[290px] ml-[50px]">
              <div className="flex">
                <img src={projectData?.projectImage ?? one} alt="ROF Aalayas" className="w-1/3 object-cover h-[290px] w-[445px]" />
                <div className="p-4">
                  <h2 style={{ fontFamily: "Manrope", fontWeight: "700", fontSize: '24px', textAlign: 'center', marginBottom: '15px' }}>{projectUrl}</h2>
                  <p style={{ fontFamily: 'Manrope', fontSize: '16px', fontWeight: '500', textAlign: 'center' }}>
                    {projectData.description}
                  </p>
                  <br />
                  <p style={{ fontFamily: 'Manrope', fontSize: '16px', fontWeight: '500', textAlign: 'center' }}>
                    ROF AALAYAS, a residential Affordable Housing Project, offers 1 and 2 BHK Apartments, promising a contemporary Indian lifestyle. You are bound to feel a mesmerizing sense of pleasure with all the desired modern facilities and a peaceful atmosphere amidst the vast stretch of green area opposite AALAYAS.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex mb-4 mt-4 items-center justify-center">
              <button
                className={`px-4 py-2 rounded-l-3xl ${action === 'service' ? 'bg-[#3D2314] text-white' : 'bg-white text-brown-700 border border-brown-700'}`}
                onClick={serviceLog}
              >Service Log</button>
              <button
                className={`px-4 py-2 rounded-r-3xl ${action === 'cheque' ? 'bg-[#3D2314] text-white' : 'bg-white text-brown-700 border border-brown-700'}`}
                onClick={chequeLog}
              >Cheque Log</button>
            </div>

            <div className="flex items-center justify-center w-full h-full">
              {action === 'service' && (
                <div className="overflow-x-auto" style={{ maxHeight: '363px' }}>
                  <table className="bg-white border border-gray-300" style={{ width: 'fit-content' }}>
                    <thead>
                      <tr className="text-center" style={{ fontFamily: "Manrope", fontSize: "14px", fontWeight: "500" }}>
                        <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Date</th>
                        <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Customer Name</th>
                        <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Customer Mobile No</th>
                        <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Service Type</th>
                        <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Service Person</th>
                        <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Service Person No</th>
                        <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Status</th>
                        <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Feedback & Comments</th>
                      </tr>
                    </thead>
                    <tbody className="text-center" style={{ fontFamily: "Manrope", fontSize: "16px", fontWeight: "500", maxHeight: '363px', overflowY: 'auto' }}>
                      {serviceData.map((log, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-50' : ''}>
                          <td className="p-2 border-b">{DateupdatedAt(log.createdAt)}</td>
                          <td className="p-2 border-b">{log.name}</td>
                          <td className="p-2 border-b">{log.mobileNo}</td>
                          <td className="p-2 border-b">{log.typeOfService}</td>
                          <td className="p-2 border-b">{log.servicePersonName}</td>
                          <td className="p-2 border-b">{log.mobileNo}</td>
                          <td className={`p-2 text-center leading-5 font-semibold border-b ${log.statusService === 'Resolved' ? 'text-[#3D943B]' :
                            log.statusService === 'Pending' ? 'text-[#E3CF16]' :
                              log.statusService === 'Disputed' ? 'text-[#EC2323]' : 'Empty'
                            }`}>{log.statusService}</td>
                          <td className="p-2 border-b">
                            {log.star}<span className="text-yellow-500 items-center ">★  </span>  {log.feedback} <span className="text-black-500 items-center ">Satisfied</span>
                            <BiCommentError className='inline ml-1' />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {action === 'cheque' && (
                <div className="overflow-x-auto" style={{ maxHeight: '363px' }}>
                  <table className="bg-white border border-gray-300" style={{ width: 'fit-content' }}>
                    <thead>
                      <tr className="text-center" style={{ fontFamily: "Manrope", fontSize: "14px", fontWeight: "500" }}>
                        <th className="py-2 px-4 bg-[#3D2314] text-[#F7F3E8]">Date</th>
                        <th className="py-2 px-4 bg-[#3D2314] text-[#F7F3E8]">Customer Name</th>
                        <th className="py-2 px-4 bg-[#3D2314] text-[#F7F3E8]">Customer ID</th>
                        <th className="py-2 px-4 bg-[#3D2314] text-[#F7F3E8]">Customer Mobile No</th>
                        <th className="py-2 px-4 bg-[#3D2314] text-[#F7F3E8]">Cheque Photo</th>
                      </tr>
                    </thead>
                    <tbody className="text-center" style={{ fontFamily: "Manrope", fontSize: "16px", fontWeight: "500", maxHeight: '363px', overflowY: 'auto' }}>
                      {chequeData.map((row, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b">{DateupdatedAt(row.createdAt)}</td>
                          <td className="py-2 px-4 border-b">{row.name}</td>
                          <td className="py-2 px-4 border-b">{row.customerId}</td>
                          <td className="py-2 px-4 border-b">{row.mobile}</td>
                          <td className="py-2 px-4 border-b">
                            <a href="http://res.cloudinary.com/det7jlotd/image/upload/v1721713883/k3ewrdxzrfzwqykhbgbl.jpg"
                              target="_blank" rel="noopener noreferrer">
                              <MdOutlineImage className="mx-auto" />
                            </a>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div
                ref={popupRef}
                className="popup-container w-[581px] h-fit p-6 gap-6 rounded-lg bg-white flex flex-col items-center z-50"
              >
                <div
                  className="upload-box w-[323px] h-[189px] border-dotted border flex flex-col items-center justify-center gap-3 cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <img
                        src={projectUploadIcon}
                        alt="Upload"
                        className="w-12 h-12"
                      />
                      <p className="font-manrope text-lg font-normal">
                        Upload Image
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <input
                  type="text"
                  className="project-name-input w-[533px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal mt-6"
                  placeholder="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <textarea
                  className="project-address-input w-[533px] min-h-[134px] p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal mt-6"
                  placeholder="Project Description"
                  value={projectAddress}
                  onChange={(e) => setProjectAddress(e.target.value)}
                />
                <button
                  className="add-project-button w-[170px] h-12 p-3 bg-[#3D2314] rounded-md text-center font-manrope text-lg font-medium text-white mt-6"
                  onClick={handleAddProject}
                >
                  Add new Project
                </button>
                {validationError && (
                  <p className="text-red-500 mt-2">{validationError}</p>
                )}
              </div>
            </div>
          )}
        </div>)}
    </>
  );
};

export default Table7;
