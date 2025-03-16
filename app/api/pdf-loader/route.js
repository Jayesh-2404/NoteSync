import { NextResponse   } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"
// const pdfUrl = "https://clear-grouse-373.convex.cloud/api/storage/c8331ed2-77f9-4a8b-a4f5-cc506d0c7fd4"
export async function GET(req){
    try {
        // Load   
        const reqUrl = req.url;
        const { searchParams} =  new URL(reqUrl);
        const pdfUrl = searchParams.get('pdfUrl')

        if (!pdfUrl) {
            throw new Error("pdfUrl parameter is required.");
        }

        const response = await fetch(pdfUrl);
        console.log(pdfUrl);
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.blob();
        const loader = new WebPDFLoader(data);
        const docs = await loader.load();
        let pdfTextContent = [];
        docs.forEach(doc => {
            pdfTextContent.push({
                pageContent: doc.pageContent,
                metadata: {
                    loc: {
                        lines: {
                            from: doc.pageNumber, // Assuming doc.pageNumber exists
                            to: doc.pageNumber
                        }
                    }
                }
            });
        });

        //split the text into small chunk
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize : 100, 
            chunkOverlap : 20,
        });
        const output = await splitter.splitText(pdfTextContent.map(doc => doc.pageContent).join(''));
        // let splitterList = [];
        // output.forEach(doc=>{
        //     splitterList.push(doc.pageContent);
        // })
        return NextResponse.json({ result: output });
    } catch (error) {
        console.error("Error loading PDF:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}