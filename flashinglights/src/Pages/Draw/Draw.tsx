import './Draw.css'
import { useState } from 'react';
import { displayColorPixels } from "../../generated-api-client/generated";

function HEXtoRGB(hex: string): [number, number, number] {
    hex = hex.replace(/^#/, "");

    if (hex.length === 3) {
        hex = hex.split("").map(c => c + c).join("");
    }

    const num = parseInt(hex, 16);

    return [
        (num >> 16) & 255,
        (num >> 8) & 255,
        num & 255
    ];
}

export default function Draw() {
    const [gridSize, setGridSize] = useState<number>(32);
    const [color, setColor] = useState<string>('#000000');
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    // Tablica kolorów komórek
    const [pixels, setPixels] = useState<string[]>(
        Array(32 * 32).fill('#ffffff')
    );
   
    // Zmiana koloru konkretnego pixela
    const paintCell = (index: number) => {
        const newPixels = [...pixels]; // te ... tworzy kopie tablicy pixels
        newPixels[index] = color;
        setPixels(newPixels);

        let requestBody = {
            pixels: [] as { x: number, y: number, color: [number, number, number] }[]
        };

        let i = 0;
        for (const p of pixels) {
            const x = i - gridSize * Math.floor(i / gridSize);
            const y = Math.floor(i / gridSize);

            requestBody.pixels.push({ x, y, color: HEXtoRGB(p) });

            i++;
        }

        console.log(JSON.stringify(requestBody));
        displayColorPixels(requestBody);
    };

    // Reset siatki
    const resetGrid = () => {
        setPixels(Array(gridSize * gridSize).fill('#ffffff'));
    };
    const downloadPNG = () => { // DO PÓŹNIEJSZEJ ZAMIANY W WYSLANIE
        const canvas = document.createElement('canvas');
        canvas.width = gridSize;
        canvas.height = gridSize;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        pixels.forEach((color, index) => {
            const x = index % gridSize
            const y = Math.floor(index / gridSize)
            
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1); 
        });

        const link = document.createElement('a');
        link.download = `pixel-art-${gridSize}x${gridSize}.png`
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    
    return (
        <>
            <main
                className='drawContainer'
                onMouseDown={() => setIsDrawing(true)}
                onMouseUp={ () => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
            >
                <section className='controls'>
                    <label>
                        <h4> Kolor: </h4>
                        <input
                        type='color'
                        className='color'
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        />
                    </label>
                    
                    <button className='resetButton' onClick={resetGrid}>
                        Reset
                    </button>
                </section>

                    <section
                        className='pixelGrid'
                        style={{ '--sz':gridSize} as React.CSSProperties}
                    >
                    
                    {/* map przechodzi po każdym elemencie pixels i robi dla nich osobne divy */}
                        {pixels.map((pixelColor, index) => (
                            <div
                                key={index}
                                className='cell'
                                style={{ backgroundColor: pixelColor }}
                                onMouseDown={() => paintCell(index)}
                                onMouseEnter={() => {
                                    if (isDrawing) paintCell(index);
                                }}
                            />
                        ))}
                    </section>
                <button className='downloadButton' onClick={downloadPNG}>
                    Pobierz png
                </button>
                    

                        
                
            </main>
        </>
    )
}
