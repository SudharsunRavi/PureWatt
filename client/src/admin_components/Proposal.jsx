import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";

const Proposal = () => {
    const navigate = useNavigate();
    const userid = useSelector((state) => state?.user?.currentUser?.userid);

    const now = moment().format("YYYY-MM-DD HH:mm");

    const [formData, setFormData] = useState({
        location: "",
        description: "",
        photo: [],
        createdat: now,
        createdby: userid
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const [images, setImages] = useState([])
    const [uploadingImages, setUploadingImages] = useState(false)
    const [imageUploadError, setImageUploadError] = useState(false)

    const handleImageSubmit = () => {
        setUploadingImages(true)
        if (images.length === 0) {
            alert('Please select an image to upload')
            setUploadingImages(false)
            return
        }
        if (images.length > 1) {
            alert('You can only upload 1 image')
            setUploadingImages(false)
            return
        }

        const image = images[0]
        storeImage(image)
            .then((url) => {
                setFormData({ ...formData, photo: url })
                setImageUploadError(false)
                setUploadingImages(false)
            })
            .catch((error) => {
                console.error("Error uploading image: ", error)
                setUploadingImages(false)
                setImageUploadError(true)
            })
    }

    const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + '-' + image.name
            const storageRef = ref(storage, `photo/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, image)
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    //console.log('Upload is ' + progress + '% done')
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/proposal/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.status === 'true') {
                toast.success("Financial Parameters Created Successfully", { duration: 3000 });
                navigate("/");
            } else if (data.status === 'false') {
                toast.error("Error Creating Financial Parameters", { duration: 3000 });
            }
        } catch (err) {
            console.log(err);
            toast.error("Error Creating Financial Parameters", { duration: 3000 });
        }
    };

    return (
        <div>
            <Toaster />
            <div className="absolute inset-0 bg-black">
            <img 
              src={'https://firebasestorage.googleapis.com/v0/b/purewatt-62253.appspot.com/o/purewatt.png?alt=media&token=079def2f-5115-452d-aef2-035a58556eb3'}
              className="h-screen w-screen object-cover opacity-40"
              alt = "Background" />   
            </div>
            <div>
                <form onSubmit={handleSubmit} className="w-11/12 md:w-4/12 absolute p-8 mt-32 bg-black bg-opacity-80 rounded-sm  mx-auto right-0 left-0 text-white">
                    <h1 className="m-2 font-bold text-3xl text-center py-4">Project Proposal</h1>
                    <input type="text" placeholder="Location" id="location" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
                    <input type="text" placeholder="Description" id="description" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
                    <div className="flex flex-row items-center gap-2 mt-2">
                        <label className="font-semibold text-md">Upload Image: </label>
                        <input type="file" accept="image/*" id="images" className="border rounded-lg p-3 focus:outline-none" onChange={(e) => setImages(Array.from(e.target.files))} />
                        <button type="button" disabled={uploadingImages} className="bg-light_green text-white p-3 rounded-lg hover:bg-arshabodhini_brown" onClick={handleImageSubmit}>{uploadingImages ? "Uploading..." : "UPLOAD"}</button>
                    </div>
                    <button type="submit" className="p-4 mb-5 mt-4 m-2 rounded-md bg-dark_green w-full">Create</button>
                </form>
            </div>
        </div>
    );
};

export default Proposal;