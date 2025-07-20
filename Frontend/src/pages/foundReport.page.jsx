import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { useCreateFoundReportsMutation, useGetCategoriesQuery } from "@/lib/api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Skeleton } from "@/components/ui/skeleton";
import { uploadImageToCloudinary } from "@/lib/cloudinery";

function FoundReport() {

    const { isSignedIn } = useAuth()
    const { user } = useUser()
    console.log("User:", user?.id)

    const [crateFoundReport, { isLoading, isError, error, isSuccess }] = useCreateFoundReportsMutation()
    const { data: categoriesList } = useGetCategoriesQuery();

    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [name, setName] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [nic, setNIC] = useState('')
    const [email, setEmail] = useState('')
    const [items, setItems] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState([]);
    const [dateOfFound, setDateOfFound] = useState('')
    const [timeOfFound, setTimeOfFound] = useState('')
    const [location, setLocation] = useState('')
    const [district, setDistrict] = useState('')
    const [nearestPoliceStation, setNearestPoliceStation] = useState('')


    const [categoryDisplay, setCategoryDisplay] = useState([])
    const flatCategory = categoryDisplay.flat();
    console.log("Category Display:", categoryDisplay)

    const [serialNo, setSerialNo] = useState('')
    const [imeiNo, setIMEINo] = useState('')
    const [licenseNo, setLicenseNo] = useState('')
    const [passportNo, setPassportNo] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setPhoneNo('')
            setNIC('')
            setEmail('')
            setItems('')
            setDescription('')
            setImages([])
            setCategory([])
            setDateOfFound('')
            setTimeOfFound('')
            setLocation('')
            setDistrict('')
            setNearestPoliceStation('')
            setSerialNo('')
            setIMEINo('')
            setLicenseNo('')
            setPassportNo('')
            navigate('/reports')
            setTimeout(() => {
                window.location.reload()
            }, 2000)
            // window.location.reload()
            toast.success('Your has been successfully created found report.')

        }
    }, [isSuccess, navigate])

    useEffect(() => {
        if (isError) {
            toast.error(error?.message || 'Failed to create found report, please try again')
        }
    }, [isError, error])


    const handleNameChange = (e) => setName(e.target.value)
    const handlePhoneNoChange = (e) => setPhoneNo(e.target.value)
    const handleNICChange = (e) => setNIC(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleItemsChange = (e) => setItems(e.target.value)
    const handleDescriptionChange = (e) => setDescription(e.target.value)
    const handleImageChange = (e) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)])
        }
    }

    const handleCategoryChangeValue = (e) => {
        const value = e.target.value;
        if (!value.includes(category)) {
            setCategory(value);
        }
    }
    const handleDateOfFoundChange = (e) => setDateOfFound(e.target.value)
    const handleTimeOfFoundChange = (e) => setTimeOfFound(e.target.value)
    const handleLocationChange = (e) => setLocation(e.target.value)
    const handleDistricChange = (e) => setDistrict(e.target.value)
    const handleNearestPoliceStationChange = (e) => setNearestPoliceStation(e.target.value)
    const handleSerialNoChange = (e) => setSerialNo(e.target.value)
    const handleIMEINoChange = (e) => setIMEINo(e.target.value)
    const handleLicenseNoChange = (e) => setLicenseNo(e.target.value)
    const handlePassportNoChange = (e) => setPassportNo(e.target.value)

    const canSave = [name,
        phoneNo,
        nic,
        email,
        items,
        description,
        // images,
        category,
        dateOfFound,
        timeOfFound,
        district,
        location,
        nearestPoliceStation]
        .every(Boolean) && !isLoading

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (canSave) {
            setIsSubmitting(true);
            let imageUrls = [];
            console.log(imageUrls)

            if (images && images.length > 0) {
                try {
                    for (const image of images) {
                        console.log("Uploading file:", image.name, image.size);
                        const url = await uploadImageToCloudinary(image);
                        console.log("Image uploaded successfully:", url);
                        imageUrls.push(url);
                    }
                    console.log("Upload successful, URL:", imageUrls);
                } catch (uploadError) {
                    console.error("Failed to upload image:", uploadError);
                    toast.error("Failed to upload  image. Please try again.", { position: "bottom-right" });
                    setIsSubmitting(false);
                    return;
                }
            }
            try {
                await crateFoundReport({
                    name,
                    phoneNo,
                    nic,
                    email,
                    items,
                    description,
                    image: imageUrls,
                    category: flatCategory,
                    dateOfFound,
                    timeOfFound,
                    district,
                    location,
                    nearestPoliceStation,
                    createBy: user.id,
                    serialNo,
                    imeiNo,
                    licenseNo,
                    passportNo
                })
            } catch (error) {
                toast.error("Failed to create found report. Please try again.", { position: "bottom-right" });
                console.error("Error creating found report:", error);

            } finally {
                setIsSubmitting(false);
            }

        }
    }

    const handleCategoryChange = (e) => {
        const value = [e.target.value];
        if (!value.includes(category)) {
            setCategoryDisplay([...categoryDisplay, value]);
        }
    }

    if (!isSignedIn) {
        navigate('/signin')
    }

    if (isLoading) {
        return (
            <section className="py-16 px-4 flex justify-center bg-gradient-to-b from-blue-100 via-white to-blue-50">
                <form
                    action=""
                    method="POST"
                    onSubmit={handleSubmit}
                    className="bg-white/60 backdrop-blur-md border border-blue-200 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-xl px-6 py-10 max-w-[800px] w-full drop-shadow-xl transition-all duration-300"
                >
                    <h2 className="text-2xl font-bold text-blue-950 pb-4">Found Item Report</h2>

                    <Skeleton />
                    <Skeleton />

                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="mr-4 ms:mr-0">
                            <Skeleton />
                            <Skeleton />
                        </div>
                        <div>
                            <Skeleton />
                            <Skeleton />
                        </div>
                    </div>


                    <Skeleton />
                    <Skeleton />

                    <label className="font-semibold" htmlFor="description">Description</label>
                    <Skeleton />

                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="mr-4 sm:mr-0">
                            <Skeleton />
                            <Skeleton />
                        </div>
                        <div>
                            <Skeleton />
                            <Skeleton />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="mr-4 ms:mr-0">
                            <Skeleton />
                            <Skeleton />
                        </div>
                        <div>
                            <Skeleton />
                            <Skeleton />
                        </div>
                    </div>

                    <Skeleton />
                    <Skeleton />

                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="mr-4 ms:mr-0">
                            <Skeleton />
                        </div>
                        <div>
                            <Skeleton />
                            <Skeleton />
                        </div>
                    </div>
                    <div className="flex justify-center py-6">
                        <Skeleton />
                    </div>

                </form>

            </section>
        );
    }

    return (
        <section className="py-16 px-4 flex justify-center bg-gradient-to-b from-blue-100 via-white to-blue-50">
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="bg-white/60 backdrop-blur-md border border-blue-200 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-xl px-6 py-10 max-w-[800px] w-full drop-shadow-xl transition-all duration-300"
            >
                <h2 className="text-2xl font-bold text-blue-950 pb-4">Found Item Report</h2>

                <label className="font-semibold" htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline-none focus:outline-blue-600"
                    placeholder="Enter your name"
                    required
                    value={name}
                    onChange={handleNameChange}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-4 ms:mr-0">
                        <label className="font-semibold" htmlFor="phoneNo">Phone Number</label><br />
                        <input
                            type="tel"
                            id="phoneNo"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline-none focus:outline-blue-600"
                            placeholder="Enter your phone number"
                            required
                            value={phoneNo}
                            onChange={handlePhoneNoChange}
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="nic">NIC</label><br />
                        <input
                            type="text"
                            id="nic" className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline-none focus:outline-blue-600"
                            placeholder="Enter your NIC number"
                            required
                            value={nic}
                            onChange={handleNICChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="font-semibold" htmlFor="nic">E-mail</label><br />
                    <input
                        type="text"
                        id="email" className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline-none focus:outline-blue-600"
                        placeholder="Enter your E-mail"
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>

                <label className="font-semibold" htmlFor="items">Found Items</label>
                <textarea
                    id="items"
                    className="w-full h-40 px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline-none focus:outline-blue-600"
                    placeholder="Enter the lost items"
                    required
                    value={items}
                    onChange={handleItemsChange}
                >

                </textarea>

                <label className="font-semibold" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className="w-full h-40 px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline-none focus:outline-blue-600"
                    placeholder="Enter a detailed description"
                    value={description}
                    onChange={handleDescriptionChange}
                >
                </textarea>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-4">
                        <label className="font-semibold" htmlFor="image">Images</label>
                        <input
                            type="file"
                            id="image"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline-none focus:outline-blue-600"
                            multiple
                            accept=".jpg,.jpeg,.png"
                            onChange={handleImageChange}
                        />
                        <div className="flex pt-0  gap-4 relative">
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
                        <label className="font-semibold" htmlFor="category">Categories</label><br />
                        <select
                            name="category"
                            id="category"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline focus:outline-blue-600"
                            value={category}
                            onChange={(e) => {
                                handleCategoryChange(e)
                                handleCategoryChangeValue(e)
                            }}

                        ><option value="">Select a category</option>


                            {
                                categoriesList?.map((category) => {
                                    return (
                                        <option key={category._id} value={category.name}>{category.name}</option>
                                    )
                                }
                                )
                            }

                        </select><br />
                        <div className="pb-4 flex flex-wrap gap-2">
                            {categoryDisplay?.map((c, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-blue-500 text-white rounded-md">
                                        <AiTwotoneCloseCircle
                                            className="text-slate-900 opacity-55 cursor-pointer float-left mt-1 mr-2 hover:opacity-100"
                                            onClick={() => setCategoryDisplay(categoryDisplay.filter((_, i) => i !== index))}
                                        />
                                        {c}

                                    </span>

                                </div>
                            ))}
                        </div>
                    </div>
                    {
                        flatCategory?.includes("Licence") && (
                            <div className="mr-4">
                                <label className="font-semibold" htmlFor="Licence">License No</label><br />
                                <input
                                    type="text"
                                    id="Licence"
                                    className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline-none focus:outline-blue-600 "
                                    placeholder="Enter your license number"
                                    required
                                    value={licenseNo}
                                    onChange={handleLicenseNoChange}
                                />
                            </div>
                        )
                    }
                    {
                        (flatCategory?.includes("Phone") || flatCategory?.includes("Tablet")) && (
                            <div className="mr-4">
                                <label className="font-semibold" htmlFor="IMEI">IMEI No</label><br />
                                <input
                                    type="text"
                                    id="IMEI"
                                    className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline-none focus:outline-blue-600 "
                                    placeholder="Enter phone IMEI no"
                                    required
                                    value={imeiNo}
                                    onChange={handleIMEINoChange}
                                />
                            </div>
                        )
                    }
                    {
                        (flatCategory?.includes("Laptop") || flatCategory?.includes("Camera")) && (
                            <div className="mr-4">
                                <label className="font-semibold" htmlFor="Serial">Serial No</label><br />
                                <input
                                    type="text"
                                    id="Serial"
                                    className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600"
                                    placeholder="Enter laptop serial no"
                                    required
                                    value={serialNo}
                                    onChange={handleSerialNoChange}
                                />
                            </div>
                        )
                    }
                    {
                        flatCategory?.includes("Passport") && (
                            <div className="mr-4">
                                <label className="font-semibold" htmlFor="passport">Passport No</label><br />
                                <input
                                    type="text"
                                    id="passport"
                                    className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline-none focus:outline-blue-600"
                                    placeholder="Enter passport no"
                                    required
                                    value={passportNo}
                                    onChange={handlePassportNoChange}
                                />
                            </div>
                        )
                    }

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-4 ms:mr-0">
                        <label className="font-semibold" htmlFor="dateOfFound">Date of Found</label>
                        <input
                            type="date"
                            id="dateOfFound"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline-none focus:outline-blue-600"
                            required
                            value={dateOfFound}
                            onChange={handleDateOfFoundChange}
                        />

                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="timeOfFound">Time of Found</label>
                        <input
                            type="time"
                            id="timeOfFound"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline-none focus:outline-blue-600"
                            required
                            value={timeOfFound}
                            onChange={handleTimeOfFoundChange}
                        />
                    </div>
                </div>

                <label className="font-semibold" htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline focus:outline-blue-600"
                    placeholder="Enter the location of the lost item"
                    required
                    value={location}
                    onChange={handleLocationChange}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-4 ms:mr-0">
                        <label className="font-semibold" htmlFor="distric">Distric</label><br />
                        <select
                            name="distric"
                            id="distric"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline focus:outline-blue-600"
                            value={district}
                            onChange={handleDistricChange}
                        >
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
                        <label className="font-semibold " htmlFor="nearestPoliceStation">Nearest Police Station</label>
                        <select
                            name="nearestPoliceStation"
                            id="nearestPoliceStation"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 border-2 rounded-md focus:outline focus:outline-blue-600"
                            value={nearestPoliceStation}
                            onChange={handleNearestPoliceStationChange}
                        >
                            <option value="">Select a police station</option>
                            <option value="Chavakachcheri">Chavakachcheri Police Station</option>
                            <option value="Chilaw">Chilaw Police Station</option>
                            <option value="Chunnakam">Chunnakam Police Station</option>
                            <option value="Colombo Central">Colombo Central Police Station</option>
                            <option value="Colombo Fort">Colombo Fort Police Station</option>
                            <option value="Colombo South">Colombo South Police Station</option>
                            <option value="Dambulla">Dambulla Police Station</option>
                            <option value="Dankotuwa">Dankotuwa Police Station</option>
                            <option value="Dehiwala">Dehiwala Police Station</option>
                            <option value="Deniyaya">Deniyaya Police Station</option>
                            <option value="Divulapitiya">Divulapitiya Police Station</option>
                            <option value="Dompe">Dompe Police Station</option>
                            <option value="Embilipitiya">Embilipitiya Police Station</option>
                            <option value="Eravur">Eravur Police Station</option>
                            <option value="Galagedara">Galagedara Police Station</option>
                            <option value="Galle">Galle Police Station</option>

                        </select>
                    </div>
                </div>

                <div className="flex justify-center py-6">
                    <Button type="submit" disabled={!canSave || isSubmitting} >Submit Lost Report</Button>
                </div>

            </form>

        </section>
    );
}

export default FoundReport;