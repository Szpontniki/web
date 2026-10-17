import { useEffect, useState } from 'react';
import { getLibraryEntries } from '../../../api/auxiliary/generated';
import './History.css'
import { displayColorPixels} from '../../../api/firmware/generated';
import type {
    GetLibraryEntries200EntriesItem
} from '../../../api/auxiliary/generated';

export default function History() {
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
        <main>
            <h1>Historia</h1>

            {photos.length === 0 && (
                <p>Brak zdjęć w historii.</p>
            )}
            <div className='imageContainer'>
                {photos.map((photo) => (
            
                    <article key={photo.id} className='containerContent'>
                        <img
                            src={photo.fileReference.publicUrl}
                            alt="Przetworzony obraz"
                            width={200}
                        />

                        <p>Typ: {photo.fileType}</p>

                        <p>
                            Data:{' '}
                            {new Date(photo.createdAt).toLocaleString()}
                        </p>

                        <p>Liczba pikseli: {photo.processedOutput.length}</p>
                        <button onClick={() => displayColorPixels({ 
                            pixels: photo.processedOutput
                        })}>
                            SHOW ON TERMINAL
                        </button>
                    </article>
                ))}
            </div>
        </main>
    );
}