"use client";
import { useState } from "react";
import PDFMerger from "pdf-merger-js"; // Ensure to install this package
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided } from "react-beautiful-dnd";
import { Iceberg } from "next/font/google";
import { BsPlus, BsUpload } from "react-icons/bs";
import { BiCross, BiMinus, BiPlus, BiSend, BiTrash, BiX } from "react-icons/bi";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [numOfColumns, setNumOfColumns] = useState(3);
  const [heightOfPDF, setHeightOfPDF] = useState(300);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(files.concat(selectedFiles));
    }
  };

  const handlePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleMerge = async () => {
    const merger = new PDFMerger();
    for (const file of files) {
      await merger.add(file);
    }
    const mergedPdfBlob = await merger.save("output.pdf");
    const url = "output.pdf";
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedFiles = Array.from(files);
    const [movedFile] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, movedFile);
    setFiles(reorderedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div className=" flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className=" w-full grid grid-cols-2 grid-cols-4 grid-cols-3 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-1 dark:grid-cols-1 h-[100px] h-[200px] h-[300px] h-[400px] h-[500px] h-[600px] h-[700px] h-[800px] h-[900px] hidden grid-cols-3 gap-4"></div>

      <header style={{ fontFamily: "monospace", fontSize: "30px", fontWeight: "bold" }}>PDF Merger</header>
      <main className="flex flex-col gap-8 w-full max-w-4xl items-center sm:items-start transition-all duration-300">

        <div className=" flex flex-row gap-1">
          <label className=" cursor-pointer bg-gray-400/20 rounded-full px-4 py-2 hover:opacity-80 flex flex-row  " htmlFor="fileuploader">
            <BiPlus className=" my-auto mr-3 font-bold bg-white text-black rounded-full scale-110" />
            <h1>Add Files</h1>
          </label>
          <input id="fileuploader" type="file" accept="application/pdf" multiple onChange={handleFileChange} className="hidden" />

          <div className="w-2"></div>

          {
            files.length >= 2 &&
            <button onClick={() => { setFiles([]) }} className=" bg-red-400/20 px-3 rounded-full hover:opacity-80">
              <BiTrash />
            </button>
          }
          <div className="w-2"></div>

          {files.length > 0 &&
            (<div className="flex flex-row gap-1">
            <div className=" flex flex-row items-center border-2 border-gray-400/50 pr-4 p-1 rounded-l-full">
            <button onClick={() => { setNumOfColumns(numOfColumns - 1) }} className=" bg-gray-400/20 rounded-l-full p-2 hover:bg-gray-400/30">
              <BiMinus />
            </button>
            <button onClick={() => { setNumOfColumns(numOfColumns + 1) }} className=" bg-gray-400/20 rounded-r-full p-2 hover:bg-gray-400/30">
              <BiPlus />
            </button>
            <h1 className=" ml-4">{numOfColumns} Columns</h1>
          </div>

          <div className=" flex flex-row items-center border-2 border-gray-400/50 pl-4 p-1 rounded-r-full">
            <h1 className=" mr-4">{heightOfPDF} Height</h1>
            <button onClick={() => { setHeightOfPDF(heightOfPDF - 100) }} className=" bg-gray-400/20 rounded-l-full p-2 hover:bg-gray-400/30">
              <BiMinus />
            </button>
            <button onClick={() => { setHeightOfPDF(heightOfPDF + 100) }} className=" bg-gray-400/20 rounded-r-full p-2 hover:bg-gray-400/30">
              <BiPlus />
            </button>
            </div>
        </div>
          )

          }
        </div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="files">
            {(provided: DraggableProvided) => (
              <div className={"grid w-full grid-cols-" + numOfColumns + " gap-4"} ref={provided.innerRef} {...provided.droppableProps}>
                {files.map((file, index) => (
                  <Draggable key={index} draggableId={`${file.name}-${index}`} index={index}>
                    {(provided: DraggableProvided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="dark:bg-[#38383d] bg-[#f9f9fa] rounded-lg overflow-hidden"
                      >
                        <iframe src={URL.createObjectURL(file)} className={"w-full h-[" + heightOfPDF + "px]"}></iframe>
                        <div className=" flex-row flex justify-between px-5  text-left w-full font-bold py-3 dark:bg-[#38383d] bg-[#f9f9fa]">
                          <h1>{file.name.length > 100 ? file.name.substring(0, 23)+"..." : file.name}</h1>
                          <button onClick={() => handleRemoveFile(index)} className=" h-fit bg-red-400/20 rounded-full p-2 hover:opacity-80"><BiX /></button>
                        </div>
                        {/* <button onClick={() => handlePreview(file)} className={"rounded-md bg-yellow-400/20 py-2 px-4 w-full "}>Preview</button> */}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {files.length > 1 && <button onClick={handleMerge} className={" rounded-full dark:bg-white dark:text-black bg-black text-white px-3 py-2 hover:opacity-80"}>
          <div className="flex flex-row w-full h-full dark:bg-white">
            <BiSend className="my-auto mr-2" />
            <h1>Merge PDFs</h1>
          </div>
        </button>}
      </main>

    </div>
  );
}
