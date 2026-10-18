import { useEffect, useState } from 'react';
import { getLibraryEntries } from '../../api/auxiliary/generated';
import './Recent.css'
import { displayColorPixels} from '../../api/firmware/generated';
import type {
    GetLibraryEntries200EntriesItem
} from '../../api/auxiliary/generated';
import logo from '../../assets/recent.png'

export default function Recent() {
    const [photos, setPhotos] = useState<GetLibraryEntries200EntriesItem[]>([]);
    
    useEffect(() => {
        const getPhotos = async () => {
            try {
                const response = await getLibraryEntries();

                if (response.status !== 200) {
                    throw new Error(`API error: ${response.status}`);
                }

                setPhotos(response.data.entries);
            } catch (error) {
                console.error('Failed to load photos:', error);
            }
        };

        getPhotos();
    }, []);

    return (
        <>
            <header className='recentHead'>
                <img src={logo} alt='recent' />
            </header>
        <main>

            {photos.length === 0 && (
                <p>No recent photos.</p>
            )}
            <div className='imageContainer'>
                {photos.map((photo) => (
            
                    <article key={photo.id} className='containerContent'>
                        <div>
                            <img
                                src={photo.fileReference.publicUrl}
                                alt="Przetworzony obraz"
                                width={256}
                                height={256}
                                className='image'
                            />
                        </div>
                        <p>Typ: {photo.fileType}</p>

                        <p>
                            Data:{' '}
                            {new Date(photo.createdAt).toLocaleString()}
                        </p>

                        <p>Liczba pikseli: {photo.processedOutput.length}</p>
                        <button className='displayButton'onClick={() => displayColorPixels({ 
                            pixels: photo.processedOutput
                        })}>
                            SHOW ON TERMINAL
                        </button>
                    </article>
                ))}
            </div>
        </main>
    </>
    );
}