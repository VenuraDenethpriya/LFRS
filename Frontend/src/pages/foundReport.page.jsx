import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import { AiTwotoneCloseCircle } from "react-icons/ai";

function FoundReport() {

    const [images, setImages] = useState([]);
    const [category, setCategory] = useState([]);
    const policeStations = ["Kurunegala Police Station",
        "Gampaha Police Station",
        "Colombo Police Station",
        "Anuradhapura Police Station",
        "Kandy Police Station",
        "Matale Police Station",
        "Jaffna Police Station",
        "Kilinochchi Police Station"]

    const handleImageChange = (e) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)])
        }
    }

    const handleCategoryChange = (e) => {
        const value = [...e.target.value];
        if (!value.includes(category)) {
            setCategory([...category, value]);
        }
    }

    console.log(category)
    return (
        <section className="py-12 bg-slate-50 flex justify-center backdrop:blur-md">
            <form action="" className="bg-slate-100 rounded-xl px-4 py-8 max-w-[800px] shadow-2xl">
                <h2 className="text-2xl font-bold text-blue-950 pb-4">Found Item Report</h2>

                <label className="font-semibold" htmlFor="">Name</label>
                <input type="text" id="name" className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600" placeholder="Enter your name" required />

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-4 ms:mr-0">
                        <label className="font-semibold" htmlFor="">Phone Number</label><br />
                        <input type="tel" id="phone" className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600" placeholder="Enter your phone number" required />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="">NIC</label><br />
                        <input type="text" id="nic" className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600" placeholder="Enter your NIC number" required />
                    </div>


                </div>


                <label className="font-semibold" htmlFor="">Found Items</label>
                <textarea id="lostItems" className="w-full h-40 px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600" placeholder="Enter the lost items" required></textarea>

                <label className="font-semibold" htmlFor="">Description</label>
                <textarea id="description" className="w-full h-40 px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600" placeholder="Enter a detailed description"></textarea>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-4 sm:mr-0">
                        <label className="font-semibold" htmlFor="images">Images</label>
                        <input type="file" id="images"
                            className="w-full px-3 py-2 mb-4 text-sm bg-slate-200"
                            multiple
                            onChange={handleImageChange}
                        />
                        <div className="flex pt-0 gap-4 relative">
                            {images.map((image, index) => (
                                <div key={index}>
                                    <img src={URL.createObjectURL(image)} alt="" className="w-auto h-16 object-cover rounded-md" />
                                    <button
                                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                                        className="absolute right-68 bottom-0 mb-1 z-50 bg-rose-600 opacity-70 p-1 rounded-full"
                                    >
                                        <IoTrashBinSharp className="text-xs" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="">Categories</label><br />
                        <select
                            name="" id=""
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline focus:outline-blue-600"
                            onChange={handleCategoryChange}
                        >
                            <option value="">Select a category</option>
                            <option value="Bag">Bag</option>
                            <option value="Money">Money</option>
                            <option value="NIC">NIC</option>
                            <option value="Licence">Licence</option>
                        </select><br />
                        <div className="pb-4 flex flex-wrap gap-2">
                            {category.map((c, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-blue-500 text-white rounded-md">
                                        <AiTwotoneCloseCircle
                                            className="text-slate-900 opacity-55 cursor-pointer float-left mt-1 mr-2 hover:opacity-100"
                                            onClick={() => setCategory(category.filter((_, i) => i !== index))}
                                        />
                                        {c}

                                    </span>

                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-4 ms:mr-0">
                        <label className="font-semibold" htmlFor="">Date of Found</label>
                        <input type="date" id="dateOfLoss" className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600" />

                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="">Time of Found</label>
                        <input type="time" id="timeOfLoss" className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600" />
                    </div>
                </div>

                <label className="font-semibold" htmlFor="">Location</label>
                <input type="text" id="location" className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline focus:outline-blue-600" placeholder="Enter the location of the lost item" />

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-4 ms:mr-0">
                        <label className="font-semibold" htmlFor="">Distric</label><br />
                        <select name="" id="" className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline focus:outline-blue-600">
                            <option value="">Select a district</option>
                            <option value="Kurunegala">Kurunegala</option>
                            <option value="Gampaha">Gampaha</option>
                            <option value="Colombo">Colombo</option>
                            <option value="Anuradhapura">Anuradhapura</option>
                            <option value="Kandy">Kandy</option>
                            <option value="Matale">Matale</option>
                            <option value="Jaffna">Jaffna</option>
                            <option value="Kilinochchi">Kilinochchi</option>
                            <option value="Mannar">Mannar</option>
                            <option value="Vavuniya">Vavuniya</option>
                            <option value="Puttalam">Puttalam</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold " htmlFor="">Nearest Police Station</label>
                        <select name="" id="" className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline focus:outline-blue-600">
                            <option value="">Select a police station</option>
                            <select name="" id="">
                                {
                                    policeStations.map((station) =>{
                                        return <option key={station.id} value={station.id}>{station}</option>
                                    })
                                }
                            </select>
                        </select>
                    </div>
                </div>

                <div className="flex justify-center py-6">
                    <Button type="submit">Submit Lost Report</Button>
                </div>

            </form>

        </section>
    );
}

export default FoundReport;