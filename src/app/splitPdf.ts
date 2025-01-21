import PDFMerger from "pdf-merger-js";

export const splitPdf = async (files: File[], pageRanges: string) => {
    const merger = new PDFMerger();
    
    // Parse the pageRanges string
    const pagesToSplit = pageRanges ? parsePageRanges(pageRanges) : null;
    
    for (const file of files) {
        await merger.add(file, pagesToSplit);
    }
    
    const splitPdfBlob = await merger.save("split_output.pdf");
    return splitPdfBlob;
};

const parsePageRanges = (pageRanges: string) => {
    const pages = new Set<number>();
    const ranges = pageRanges.split(',');

    ranges.forEach(range => {
        const [start, end] = range.split('-').map(Number);
        if (end) {
            for (let i = start; i <= end; i++) {
                pages.add(i);
            }
        } else {
            pages.add(start);
        }
    });

    return Array.from(pages);
};

export { parsePageRanges }