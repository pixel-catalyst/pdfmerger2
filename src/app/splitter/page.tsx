"use client"
import React, { useState } from "react";
import PDFMerger from "pdf-merger-js";
import { BiFile, BiFolder, BiPlus, BiSend, BiUpload } from "react-icons/bi";
import { Iceberg } from "next/font/google";

const Splitter = () => {
    const [file, setFile] = useState<File | null>(null);
    const [pageRanges, setPageRanges] = useState<string>("");
    const font = Iceberg({
        weight: "400"
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            setFile(selectedFiles[0]);
        }
    };

    const handleInputChange = (value: string) => {
        setPageRanges(value);
    };

    const handleSplit = async () => {
        const merger = new PDFMerger();
        const ranges = pageRanges.replace(" ", "").split("|")
        for (const [index, range] of ranges.entries()) {
            console.log(file, range, index)
            await merger.add(file, range)
            await merger.save("output_" + index + 1)
            await merger.reset()
        }
    };

    return (
        <div className=" flex flex-col items-center justify-items-center max-w-4xl mx-auto w-full h-full min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">

            <h1 className={font.className}>PDF Splitter</h1>
            <label className=" cursor-pointer bg-gray-400/20 rounded-full px-4 py-2 hover:opacity-80 flex flex-row  " htmlFor="fileuploader">
                <BiFolder className=" my-auto mr-3 font-bold rounded-full scale-110" />
                <h1> {file == null ? "Select File" : file.name}</h1>
            </label>
            <input id="fileuploader" type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
            {file &&
                (
                    <div className="h-full w-full">
                        <div className="dark:bg-[#38383d] bg-[#f9f9fa] rounded-2xl h-full w-full overflow-hidden">
                            {/* <h2 className="py-2 px-2 font-bold">{file?.name}</h2> */}
                            <iframe src={URL.createObjectURL(file!!)} className="w-full h-[400px]" />
                        </div>


                        <div className="dark:bg-[#38383d] bg-[#f9f9fa] mt-8 p-8 rounded-2xl h-full w-full overflow-hidden">

                            <div className=" flex flex-row justify-start items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="Pages: 1-4 | 5,6"
                                    value={pageRanges}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    className=" bg-gray-400/20 px-3 py-1 rounded-full"
                                />

                                <button onClick={handleSplit} className=" dark:bg-white bg-black dark:text-black rounded-full px-2 py-1 text-white scale-110">
                                    <BiSend />
                                </button>
                            </div>


                            <div className=" p-0 bg-black/20 mt-3 border-2 border-gray-400/20 rounded-2xl overflow-hidden">
                                <div className="overflow-x-auto rounded-2xl">
                                    <table className="min-w-full ">
                                        <thead className="font-bold bg-black/20">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-sm bg-black/20 border border-gray-400/20">Symbol</th>
                                                <th className="px-4 py-2 text-left text-sm bg-black/20 border border-gray-400/20">Stands for</th>
                                                <th className="px-4 py-2 text-left text-sm bg-black/20 border border-gray-400/20">Example</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="px-4 py-2 text-sm bg-black/20 border border-gray-400/20">Hyphen <span className="font-mono text-cyan-400">(-)</span></td>
                                                <td className="px-4 py-2 text-sm bg-black/20 border border-gray-400/20">Range of Pages</td>
                                                <td className="px-4 py-2 text-sm bg-black/20 border border-gray-400/20">
                                                    <span className="text-cyan-500">1-4</span> gives pages 1,2,3,4
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2 text-sm bg-black/20 border border-gray-400/20">Comma (,)</td>
                                                <td className="px-4 py-2 text-sm bg-black/20 border border-gray-400/20">List of Pages</td>
                                                <td className="px-4 py-2 text-sm bg-black/20 border border-gray-400/20">
                                                    <span className="text-cyan-500">5,6</span> gives pages 5 and 6
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2 text-sm bg-black/20 border border-gray-400/20">Pipe (|)</td>
                                                <td className="px-4 py-2 text-sm bg-black/20 border border-gray-400/20">New Output File</td>
                                                <td className="px-4 py-2 text-sm bg-black/20 border border-gray-400/20">
                                                    <span className="text-cyan-500">1-4 | 5,6</span> File1 ( 1-4 ) File2 ( 5,6 )
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <div className=" font-mono p-4 bg-black/30 mt-3 rounded-t-2xl -mb-8">
                                <h1>Aim: <span className="opacity-60">Getting pages 1,2,3,4 and 7</span> <br /> Input: <span className="opacity-60">1-4, 7</span></h1>
                                <br />
                                <h1>Aim: <span className="opacity-60">Getting pages 1-4 in one file and 5-9 in another</span> <br /> Input: <span className="opacity-60">1-4 | 5-9</span></h1>
                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    );
};

export default Splitter;
