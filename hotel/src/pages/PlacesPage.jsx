import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from 'axios';
export default function PlacesPage(){

    const {action}= useParams();
    const [title, setTitle] = useState('');
    const[address, setAddress] = useState('');
    const[addedPhotos, setAddedPhotos] = useState([]);
    const[photoLink, setPhotoLink] = useState('');
    const[description, setDescription] = useState('');
    const[perks, setPerks] = useState([]);
    const[extraInfo, setExtraInfo] = useState('');
    const[checkIn, setCheckIn] = useState('');
    const[checkOut, setCheckOut] = useState('');
    const[maxGuests, setMaxGuests] = useState(1);

    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename}= await axios.post('upload-by-link', {link:photoLink})
        setAddedPhotos(prev=>{
            return [...prev, filename];
        });

        setPhotoLink('');
    }

    async function uploadPhoto(ev){
        const files= ev.target.files;
        const data= new FormData(); 
        for(let i=0; i<files.length; i++){
            data.append('photos', files[i]);
        }
        axios.post('upload', data, {
            headers:{'Content-Type':'multipart/form-data'}
        }).then(response =>{
            const{data:filename}= response;

            setAddedPhotos(prev=>{
                return [...prev, filename];
            });
        });
    }


    return (
        <div>
        {action !== 'new' &&(
            <div className="text-center">
                <Link className="bg-gray-400 text-white rounded-full py-2 px-4 inline-flex gap-1" to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add New Places
                </Link>
            </div>
        )}

        {action === 'new' && (
            <div>
            <form>  
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm">Title for your place</p>
                <input className="border rounded-2xl p-1 w-full" type="text" value={title} onChange={ev=> setTitle(ev.target.value)} placeholder="title, for example:My lovely apartment" />

                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm">Address to this place</p>
                <input value={address} onChange={ev=> setAddress(ev.target.value)} className="border rounded-2xl p-1 w-full" type="text" placeholder="address" />

                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500 text-sm">more==better</p>
                <div className="flex gap-2">
                    <input value={photoLink} onChange={ev=> setPhotoLink(ev.target.value)} className="border rounded-2xl p-1 w-full" type="text" placeholder="Add using a link....jpg" />
                    <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photo</button>
                </div>
                
                <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
                    {addedPhotos.length > 0 && addedPhotos.map(link =>(
                        <div>
                            <img className="rounded-2xl" src={"http://localhost:4000/uploads/" + link} alt="" />
                        </div>
             ))}
                    <label className="border bg-transparent rounded-2xl p-2 text-lg text-gray-600 flex items-center justify-center gap-1 cursor-pointer">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                    Upload
                    </label>
                </div>
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm">Description of place</p>
                <textarea value={description} onChange={ev=>setDescription(ev.target.value)} />
                
                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm"> Select all the Perks of your Place</p>

                <div  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
                <Perks selected={perks} onChange={setPerks} />
                </div>

                <h2 className="text-2xl mt-4">ExtraInfo</h2>
                <p className="text-gray-500 text-sm">House rules</p>
                <textarea value={extraInfo} onChange={ev=> setExtraInfo(ev.target.value)}/>

                <h2 className="text-2xl mt-4">Check IN & OUT times</h2>
                <p className="text-gray-500 text-sm">Add check in and out times, remember to have some time window for cleaning the room between the guests</p>

                <div className="grid sm:grid-cols-3 gap-2">
                    <div>
                        <h3 className="mt-2 -mb-1">Check In Time</h3>
                        <input type="text" placeholder="14:00" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check Out Time</h3>
                        <input type="text" placeholder="14:00" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}  />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1"> Max number of guests</h3>
                        <input type="number" placeholder="1" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} />
                    </div>
                </div>
                    <button className="p-2 w-full rounded-2xl my-4">Save</button>
            </form>
            </div>
            
        )}
            
            
        </div>
    )
}