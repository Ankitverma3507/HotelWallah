import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from 'axios';
import PlacesFormPage from "./PlacesFormPage";
import PhotosUploader from "../Photo";
export default function PlacesPage(){

    const {action}= useParams();


    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename}= await axios.post('upload-by-link', {link:photoLink})
        setAddedPhotos(prev=>{
            return [...prev, filename];
        });
        setPhotoLink('');
    }


    async function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        await axios.post('/upload', data, {
            headers: {'Content-type':'multipart/form-data'}
        }).then(response => {
            const {data:filenames} = response;
            onChange(prev => {
            return [...prev, ...filenames];
        });
        })
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
            <PlacesFormPage/>
            
        )}
            
            
        </div>
    )
}