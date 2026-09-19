import './Upload.css'
import { useState, type ChangeEvent, type DragEvent } from 'react'

export default function Upload() {  
        // FUNKCJE UPLOADU

        // Potrzebne aby go wysłac na serwer
        // selectedImage przechowuje plik -> czyli obiekt typu File ( to z use state określa że albo File albo nic z tego co to rozumiem) 
        const [selectedImage, setSelectedImage] = useState<File | null>(null);
        // previewUrl przechowuje string który jest tymczasowym adresem URL wygenerowanym przez przeglądarke dla wyświetlania obrazu
        const [pixelArtUrl, setPixelArtUrl] = useState<string | null>(null);
        const [pixelArtBlob, setPixelArtBlob] = useState<Blob | null>(null); // pixelArtBlob do wysłania na serwer
        const [isUploading, setIsUploading] = useState(false); // Do wysłania na serwer


        // Funkcja zamieniająca na pixelart
        const processToPixelArt = (file: File) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                // Tymczasowy canvas 32x32
                const canvas = document.createElement('canvas');
                canvas.width = 32;
                canvas.height = 32;

                const ctx = canvas.getContext('2d');
                if (!ctx) return;


                // Wyłączenie wygładzania
                ctx.imageSmoothingEnabled = false;

                // Rysowanie dużego obrazu na powierzchni 32x32
                ctx.drawImage(img, 0, 0, 32, 32);

                // Pobranie podglądu jako url 
                const pixelatedDataUrl = canvas.toDataURL('image/png');
                setPixelArtUrl(pixelatedDataUrl);

            };
        };
            



        

        // funkcja blokująca przesłanie plików innych niż zdjęcia
        const handleFile = (file: File) => {
            if (file && file.type.startsWith('image/')) { // jeżeli plik jest i sprawdzi plik MIME pliku -> musi zaczynac sie z odpowiednikiem zdjęcia
                setSelectedImage(file);
                processToPixelArt(file); // przetwarza na 32x32
            } else {
                alert('Prosze wybrać plik graficzny (PNG, JPG, itp.)');
            }
        };

        
        // e: -> event object

        const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => { // Odpala się kiedy użytkownik kliknie przycisk i wybierze plik z okna systemowego
            if(e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]); // e.target.files[0] pobiera pierwszy pobrany plik
            }
        };

        const handleDragOver = (e: DragEvent<HTMLDivElement>)=> {
            e.preventDefault(); // Zapobiega otwarcia obrazu w osobnej karcie, jeżeli się dragnie plik np. koło miejsca ,,zrzutu,, T.T
        };
        
        const  handleDrop = (e: DragEvent<HTMLDivElement>)=> {
            e.preventDefault();
            if(e.dataTransfer.files && e.dataTransfer.files[0]) { // e.dataTransfer.files[0] przechowuje pliki przeciągniete nad element ,,zrzutu,,
                handleFile(e.dataTransfer.files[0]); 
            }
        }

        // STRONA
        return (
            <main>
                {/* DROPZONE */}
                <section 
                className='dropzone' 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                >
                    <p> Przeciągnij i upuść zdjęcie tutaj </p>
                    <span> lub </span>
                    <br />
                    <label htmlFor='file-input' className='fileLabel'>
                        Wybierz plik z komputera
                    </label>
                    <input
                    id='file-input'
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    />
                </section>
                {pixelArtUrl && (
                    <div className='previewContainer'>
                            <h3>Podgląd:</h3>
                            {/* Odpala ten pixelArtUrl jako podgląd, tak jakby odpala strone w stronie xd */}
                            <img src={pixelArtUrl} alt='Podgląd' className='imagePreview' /> 
                            <p>Nazwa pliku: {selectedImage?.name}</p>
                    </div>
                )}


            </main>

        )

}

