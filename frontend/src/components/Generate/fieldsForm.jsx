import React from "react";

export default function FieldsForm({
  selectedField,
  inputData,
  handleFieldChange,
  handleSubmit,
}) {
  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit} className="m-7">
          {/* 2) Text field */}
          {selectedField === "text" && (
            <>
              <h2 className="mt-7">Plain Text </h2>
              <textarea
                className="flex border border-gray-950 p-3 w-[300px] md:w-[600px] "
                type="text"
                placeholder="Write your text here..."
                value={inputData.text}
                onChange={(e) => handleFieldChange("text", e.target.value)}
                required
              />
            </>
          )}
          {/* 3) URL Field */}
          {selectedField === "url" && (
            <>
              <h2 className="mt-3">URL</h2>
              <input
                className="flex border-b border-gray-900 focus:outline-none focus: p-3  w-[300px] sm:w-[600px] mt-2"
                type="url"
                placeholder="Enter your url"
                value={inputData.url}
                onChange={(e) => handleFieldChange("url", e.target.value)}
              />
            </>
          )}
          {/*4) Email field */}
          {selectedField === "email" && (
            <>
              <input
                className="flex border-b border-gray-900 focus:outline-none p-2  w-[300px] sm:w-[600px] mt-3"
                type="email"
                placeholder="Email"
                value={inputData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
              />
              <input
                className="flex border-b border-gray-900 focus:outline-none p-2 w-[300px] sm:w-[600px] mt-3"
                type="text"
                placeholder="Email subject"
                value={inputData.E_message}
                onChange={(e) => handleFieldChange("E_message", e.target.value)}
              />
              <p className="mt-3">Add message</p>
              <textarea
                className="p-3 mr-2 w-[300px] sm:w-[600px] border border-gray-900"
                name="text"
                placeholder="Enter text here"
                value={inputData.Description}
                onChange={(e) =>
                  handleFieldChange("Description", e.target.value)
                }
              ></textarea>
            </>
          )}
          {/*5) Contact field */}
          {selectedField === "contact" && (
            <>
              <input
                className=" flex p-1 border-b border-gray-900 focus:outline-none  w-[300px] sm:w-[600px] mt-3"
                type="text"
                placeholder="Prefix (Mr, Mrs, Dr, etc.)"
                value={inputData.prefix}
                onChange={(e) => handleFieldChange("prefix", e.target.value)}
              />
              <p className="opacity-50 text-sm ">
                For example: Mr, Miss, Mrs, Dr, etc
              </p>
              <input
                className=" flex p-1 border-b border-gray-900 focus:outline-none w-[300px] sm:w-[600px] mt-1"
                type="text"
                placeholder="First Name"
                value={inputData.fname}
                onChange={(e) => handleFieldChange("fname", e.target.value)}
              />
              <input
                className="flex p-1 border-b border-gray-900 focus:outline-none w-[300px] sm:w-[600px] mt-3"
                type="text"
                placeholder="Last Name"
                value={inputData.lname}
                onChange={(e) => handleFieldChange("lname", e.target.value)}
              />
              <input
                className="flex p-1 border-b border-gray-900 focus:outline-none w-[300px] sm:w-[600px] mt-3"
                type="text"
                placeholder="Organization"
                value={inputData.organization}
                onChange={(e) =>
                  handleFieldChange("organization", e.target.value)
                }
              />
              <input
                className="flex p-1 border-b border-gray-900 focus:outline-none w-[300px] sm:w-[600px] mt-3"
                type="text"
                placeholder="Country"
                value={inputData.country}
                onChange={(e) => handleFieldChange("country", e.target.value)}
              />
              <input
                className="flex p-1 border-b border-gray-900 focus:outline-none w-[300px] sm:w-[600px] mt-3"
                type="text"
                placeholder="Region"
                value={inputData.region}
                onChange={(e) => handleFieldChange("region", e.target.value)}
              />
            </>
          )}
          {/*5) sms field */}
          {selectedField === "sms" && (
            <>
              <input
                type="number"
                placeholder="Phone Number"
                className="flex p-1 border-b border-gray-900 focus:outline-none w-[300px] sm:w-[600px] mt-3"
                value={inputData.phoneNumber}
                onChange={(e) =>
                  handleFieldChange("phoneNumber", e.target.value)
                }
              />
              <p className="mt-3">Add message</p>
              <textarea
                className="p-3 mr-2 w-[300px] sm:w-[600px] border border-gray-900"
                placeholder="Add message"
                value={inputData.Message}
                onChange={(e) => handleFieldChange("Message", e.target.value)}
              ></textarea>
            </>
          )}

          {/*6) phone number field */}
          {selectedField === "phone" && (
            <input
              className="flex border-b border-gray-900 focus:outline-none p-2 w-[300px] sm:w-[600px] mt-4"
              type="number"
              placeholder="Phone Number"
              value={inputData.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
            />
          )}
        </form>
      </div>
    </>
  );
}
