import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Loading from "../Loding/Loding";
import axios from "axios";
import { format } from "date-fns";

function EditForm1() {

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [FormData, setFormData] = useState({
    customerName: "",
    channelPartnerCompanyName: "",
    channelPartnerName: "",
    customerMobileLastFour: "",
    partnerId: "",
    projectName: "",
    createdAt: "",
    responseTime: "",
    timeDuration: "",
    createdAt: "",
  });
  const [data, setData] = useState({});

  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://project-rof.vercel.app/api/partners/fetch/${id}`
      );
      setFormData(res.data);


      const res1 = await axios.post(
        `https://project-rof.vercel.app/api/partners/fetchByName`, { channelPartnerName: res.data.channelPartnerName }
      );

      setData(res1.data)

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  console.log("FormData", FormData);
  console.log("Data", data);

  useEffect(() => {
    getData();
  }, [id]);

  //  ! time
  const DateupdatedAt = (DateupdatedAt) => {
    if (!DateupdatedAt) return "Invalid Date";
    try {
      const formattedDate = format(new Date(DateupdatedAt), "dd MMM yyyy");
      return formattedDate;
    } catch (error) {
      return "Invalid Date";
    }
  };

  const ResponseAt = (DateupdatedAt) => {
    if (!DateupdatedAt) return "Invalid Date";
    try {
      const formattedDate = format(new Date(DateupdatedAt), "hh:mm a");
      return formattedDate;
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Handler to update the state
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleEditMode = async (id) => {
    setEditMode(!editMode);

    try {
      const res = await axios.put(
        `https://project-rof.vercel.app/api/partners/update/${id}`,
        {
          ...FormData,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex flex-wrap ">
            <div className="ml-8 mt-8">
              <h1
                className="font-bold flex items-center gap-1"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "24px",
                  fontWeight: "500",
                }}
              >
                Home
                <IoIosArrowForward style={{ color: "#1C1B1F" }} />
                <Link to="/Channel_Visitors">
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "24px",
                  }}
                  className="font-medium"
                >
                  Channel Visitors
                </span>
                </Link>
                <IoIosArrowForward style={{ color: "#1C1B1F" }} />
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "24px",
                  }}
                  className="font-medium"
                >
                  Channel ID
                </span>
              </h1>
            </div>
            <div className="lg:ml-[1000px] mt-9">
              <button
                className="flex lg:px-8 lg:py-4 editbutton bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full"
                key={FormData._id}
                onClick={() => toggleEditMode(FormData._id)}
              >
                <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
                  <FaRegEdit />
                </h4>
                <p className="text-[16px]">
                  {editMode ? "Save" : "Edit Details"}
                </p>
              </button>
            </div>
          </div>
          <main className="flex flex-wrap gap-5 lg:ml-8 lg:mt-10">
            <div
              className="lg:w-[695px] lg:h-[792px] bg-[#FFFFFF] p-[24px] rounded-2xl shadow-lg shadow-[#632E04] mb-6 lg:mb-0 lg:mr-4"
              style={{ borderRadius: "24px" }}
            >
              <h2
                className="text-[20px] text-center font-[Manrope] mb-4"
                style={{ fontWeight: "700" }}
              >
                Customer and Channel Partner Detail
              </h2>
              <form >
                <div >
                  <div>
                    <div className="flex flex-wrap gap-[40px]">
                      <div>
                        <label
                          htmlFor="first_name"
                          className="block text-[#000000] text-[16px] font-[Manrope]"
                          style={{ fontWeight: "500" }}
                        >
                          Customer Name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          name="customerName"
                          value={FormData.customerName}
                          className="lg:w-[393px] lg:h-[47px] p-1 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          placeholder="Anand Jaiswal"
                          required
                          readOnly={!editMode}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-[#000000] text-[16px] font-[Manrope]"
                        >
                          Last 4 Digit
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="customerMobileLastFour"
                          value={FormData.customerMobileLastFour}
                          className="lg:w-[214px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          placeholder="1 4 6 5"
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          required
                          readOnly={!editMode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="lg:mt-1">
                      <label
                        htmlFor=" Channel Name"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                      >
                        Channel Name
                      </label>
                      <input
                        type="text"
                        id=" Channel Name"
                        name="channelPartnerCompanyName"
                        value={FormData.channelPartnerCompanyName}
                        className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        placeholder="Rainbow Overseas Pvt Ltd"
                        required
                        readOnly={true}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mt-1">
                    <div className="flex flex-wrap gap-[40px]">
                      <div>
                        <label
                          htmlFor="  Channel Partner Name"
                          className="block text-[#000000] text-[16px] font-[Manrope]"
                        >
                          Channel Partner Name
                        </label>
                        <input
                          type="text"
                          id="  Channel Partner Name"
                          name="channelPartnerName"
                          value={FormData.channelPartnerName}
                          className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          placeholder="Sameer Chowdhary"
                          required
                          readOnly={true}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Channel Partner ID"
                          className="block text-[#000000] text-[16px] font-[Manrope]"
                        >
                          Channel Partner ID
                        </label>
                        <input
                          readOnly={true}
                          type="text"
                          name="partnerId"
                          id="Channel Partner ID"
                          value={FormData.partnerId}
                          onChange={handleChange}
                          className="lg:w-[214px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          placeholder="CHROF0001"
                          required

                        />
                      </div>
                    </div>

                    <div className="lg:mt-1">
                      <label
                        htmlFor="Project "
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500" }}
                      >
                        Project
                      </label>
                      <input
                        type="text"
                        id="Project"
                        name="projectName"
                        value={FormData.projectName}
                        onChange={handleChange}
                        className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        placeholder="Project A"
                        required
                        readOnly={true}
                      />
                    </div>

                    <div className="lg:mt-1">
                      <label
                        htmlFor="attendant"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500" }}
                      >
                        Attendant
                      </label>
                      <input
                        type="text"
                        id="attendant"
                        name="attendantName"
                        value={FormData.attendantName}
                        onChange={handleChange}
                        className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        placeholder="Samyak Gandhi"
                        required
                        readOnly={true}
                      />
                    </div>
                  </div>

                  <div className="lg:flex lg:flex-wrap gap-[24px] lg:mt-1">
                    <div>
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500" }}
                      >
                        Date
                      </label>
                      <input
                        type="text"
                        name="createdAt"
                        readOnly={true}
                        value={DateupdatedAt(FormData.createdAt)}
                        onChange={handleChange}
                        className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500" }}
                      >
                        Response Time
                      </label>
                      <input
                        type="text"
                        readOnly={true}
                        value={ResponseAt(FormData.createdAt)}
                        onChange={handleChange}
                        name="responseTime"
                        className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500" }}
                      >
                        Meeting Duration
                      </label>
                      <input
                        type="text"
                        readOnly={true}
                        name="timeDuration"
                        value={FormData.timeDuration}
                        onChange={handleChange}
                        className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                      />
                    </div>
                  </div>

                  <div className="textarear-comp">
                    <div className="mt-1">
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500" }}
                      >
                        Executive Notes
                      </label>
                      <textarea className="lg:w-[641px] lg:h-[173px] border-[2px] border-[#3D2314] rounded-lg mt-1"
                        name="notes"
                        onChange={handleChange}
                        readOnly={!editMode}>
                        {FormData.notes}
                      </textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="lg:w-[555px] lg:h-[683px] bg-[#FFFFFF] p-[8px] rounded-2xl shadow-lg shadow-[#632E04]">
              <div className="mt-4">
                <h2
                  className="text-center mb-4 text-[#000000] text-[20px] font-[Manrope]"
                  style={{ fontWeight: "700" }}
                >
                  Channel Partner Activity Log
                </h2>
              </div>
              <div className="w-full h-full overflow-x-auto">
                <div className="w-full h-[87%] overflow-y-auto">
                  <table className="w-full text-leftm">
                    <thead className="">
                      <tr className="text-[#FFFFFF]">
                        <th className="border-b p-2 bg-[#3D2314]" style={{ fontSize: "14px", fontWeight: "400" }}>
                          Serial No
                        </th>
                        <th className="border-b p-2 bg-[#3D2314]" style={{ fontSize: "14px", fontWeight: "400" }}>
                          Date
                        </th>
                        <th className="border-b p-2 bg-[#3D2314]" style={{ fontSize: "14px", fontWeight: "400" }}>
                          Timing
                        </th>
                        <th className="border-b p-2 bg-[#3D2314]" style={{ fontSize: "14px", fontWeight: "400" }}>
                          Project
                        </th>
                        <th className="border-b p-2 bg-[#3D2314]" style={{ fontSize: "14px", fontWeight: "400" }}>
                          Channel Partner
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-b p-2 text-[#000000] text-[16px] font-[Manrope]" style={{ fontWeight: "500" }}>
                      {data.length > 0
                        ? data.map((item, index) => (
                          <tr key={item.id}>
                            <td className="border-b p-2">{index + 1}</td>
                            <td className="border-b p-2">{DateupdatedAt(item.createdAt)}</td>
                            <td className="border-b p-2">{ResponseAt(item.createdAt)}</td>
                            <td className="border-b p-2">{item.projectName}</td>
                            <td className="border-b p-2">{item.customerName}</td>
                          </tr>
                        ))
                        : "No Data Found..."}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default EditForm1;