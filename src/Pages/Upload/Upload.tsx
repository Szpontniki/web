import './Upload.css'
import { useState, type ChangeEvent, type DragEvent } from 'react'
import { displayColorPixels } from "../../api/firmware/generated.ts";
import { processImage, type ProcessImageRequest} from '../../api/auxiliary/generated.ts';
// import { Buffer } from 'buffer';
export default function Upload() {  
        // FUNKCJE UPLOADU

        // Potrzebne aby go wysłac na serwer
        // selectedImage przechowuje plik -> czyli obiekt typu File ( to z use state określa że albo File albo nic z tego co to rozumiem) 
        const [selectedImage, setSelectedImage] = useState<File | null>(null);
        // previewUrl przechowuje string który jest tymczasowym adresem URL wygenerowanym przez przeglądarke dla wyświetlania obrazu
        const [pixelArtUrl, setPixelArtUrl] = useState<string | null>(null);

        // użycie fileToBase64(image)
        const fileToBase64 = (file: File):Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result as string;
                    const base64 = result.split(',')[1];
                
                    resolve(base64);
                };
                

                reader.onerror = (err) => reject(err);
                reader.readAsDataURL(file);
                
            });
        }
        // Funkcja wysyłająca do pomocniczego API, requesta o zmiane na base64
        const processToPixelArt = async (file: File): Promise<void> => {
            try {
                const imageBase64 = await fileToBase64(file);
                const requestBody: ProcessImageRequest = { 
                        width: 32, 
                        height: 32, 
                        imageBase64, 
                };
                
                

                const response = await processImage(requestBody);
                if (response.status === 200) {
                    const processedImage = response.data.pixels; 
                    console.log("[UPLOAD] RESPONSE Pixels:", processedImage);
                    // const base64ToString = Buffer.from(processedImage, 'base64').toString('utf-8');
                    // console.log(base64ToString);
                    setPixelArtUrl(
                        `data:image/png;base64,${processedImage}`
                    );
                    displayColorPixels({
                        pixels: response.data.pixels,
                    })
                }

               
            } catch (error) {
                console.error("[UPLOAD] SEND ERROR:", Response);
                if (error instanceof Error) {
                    console.error("[Upload] Error message:", error.message);
                
                    console.error("[Upload] Error stack:", error.stack);
                }
            }
        };
        // Funckja odbierająca od API base64 zpixelowanego obrazka, i wyświetlająca go na led gridzie
       

                    

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

