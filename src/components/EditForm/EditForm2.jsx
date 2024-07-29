import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditForm2() {
  const [data, setData] = useState({
    customerName: "",
    customerMobileLastFour: "",
    channelPartnerName: "",
    channelPartnerCompanyName: "",
    _id: "",
    projectName: "",
    attendantName: "",
    createdAt: "",
    updatedAt: "",
    __v: ""
  });

  const params = useParams();

  const fetchDataById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/record/getRecordBy/${params.id}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataById();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/record/updateRecord/${params.id}`,
        data
      );
      alert("Data updated successfully!");
    } catch (err) {
      console.log(err);
      alert("Error updating data.");
    }
  };

  return (
    <>
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
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium"
              >
                Channel Partners
              </span>
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium"
              >
                Rainbow Overseas
              </span>
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium"
              >
                Edit
              </span>
            </h1>
          </div>
          <div className="lg:ml-[1000px] mt-9">
            <button className="flex lg:px-8 lg:py-4 editbutton bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full">
              <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
                <FaRegEdit />
              </h4>
              <p className="text-[16px]">Edit Details</p>
            </button>
          </div>
        </div>
        <main className="flex flex-wrap gap-5 lg:ml-8 lg:mt-10 ">
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
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <div className="flex flex-wrap gap-[40px]">
                    <div>
                      <label
                        htmlFor="customerName"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500" }}
                      >
                        Customer Name
                      </label>
                      <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        className="lg:w-[393px] lg:h-[47px] p-1 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        placeholder="Anand Jaiswal"
                        value={data.customerName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="customerMobileLastFour"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                      >
                        Last 4 Digit
                      </label>
                      <input
                        type="tel"
                        id="customerMobileLastFour"
                        name="customerMobileLastFour"
                        className="lg:w-[214px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        placeholder="1 4 6 5"
                        value={data.customerMobileLastFour}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="lg:mt-1">
                    <label
                      htmlFor="channelPartnerName"
                      className="block text-[#000000] text-[16px] font-[Manrope]"
                    >
                      Channel Name
                    </label>
                    <input
                      type="text"
                      id="channelPartnerName"
                      name="channelPartnerName"
                      className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                      placeholder="Rainbow Overseas Pvt Ltd"
                      value={data.channelPartnerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mt-1">
                  <div className="flex flex-wrap gap-[40px]">
                    <div>
                      <label
                        htmlFor="channelPartnerCompanyName"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                      >
                        Channel Partner Name
                      </label>
                      <input
                        type="text"
                        id="channelPartnerCompanyName"
                        name="channelPartnerCompanyName"
                        className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        placeholder="Sameer Chowdhary"
                        value={data.channelPartnerCompanyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="channelPartnerID"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                      >
                        Channel Partner ID
                      </label>
                      <input
                        readOnly
                        type="text"
                        id="channelPartnerID"
                        name="channelPartnerID"
                        className="lg:w-[214px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        placeholder="CHROF0001"
                        value={data.partnerId}
                        required
                      />
                    </div>
                  </div>

                  <div className="lg:mt-1">
                    <label
                      htmlFor="projectName"
                      className="block text-[#000000] text-[16px] font-[Manrope]"
                      style={{ fontWeight: "500" }}
                    >
                      Project
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      name="projectName"
                      className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                      placeholder="Project A"
                      value={data.projectName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="lg:mt-1">
                    <label
                      htmlFor="attendantName"
                      className="block text-[#000000] text-[16px] font-[Manrope]"
                      style={{ fontWeight: "500" }}
                    >
                      Attendant
                    </label>
                    <input
                      type="text"
                      id="attendantName"
                      name="attendantName"
                      className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                      placeholder="Samyak Gandhi"
                      value={data.attendantName}
                      onChange={handleChange}
                      required
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
                      type="date"
                      name="createdAt"
                      className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                      value={data.createdAt}
                      onChange={handleChange}
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
                      type="time"
                      name="updatedAt"
                      className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                      value={data.updatedAt}
                      onChange={handleChange}
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
                      type="time"
                      name="__v"
                      className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                      value={data.__v}
                      onChange={handleChange}
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
                    <textarea
                      name="executiveNotes"
                      className="lg:w-[641px] lg:h-[173px] border-[2px] border-[#3D2314] rounded-lg mt-1"
                      value={data.executiveNotes}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-[#3D2314] text-white px-6 py-3 rounded-full"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default EditForm2;
