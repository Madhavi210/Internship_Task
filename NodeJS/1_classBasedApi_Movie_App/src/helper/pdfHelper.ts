import PDFDocument from 'pdfkit'
import { Movies } from '../models/movie.model';
export const getPdfHandler = (data:any) => {
    const doc = new PDFDocument();
 
       // Setting up the layout parameters
    const marginLeft = 50;
    const columnGap = 200;
    const headerFontSize = 14;
    const rowFontSize = 12;
    const initialYPosition = 50;
 
        // Drawing a line as a separator
    doc.moveTo(marginLeft, initialYPosition).lineTo(marginLeft + 4 * columnGap, initialYPosition).stroke();

     // Adding a header text to the document
    doc.fontSize(headerFontSize).text('Movie Details', marginLeft, initialYPosition + 20);
 
        // Initializing the vertical position for writing content
    let yPosition = initialYPosition + 40;
   
   
    data.forEach((elem:any, index:any) => {
        
        console.log(elem);
        
        let movieDetails:Movies = elem.movieId ;
        if (movieDetails) {
            console.log("movieDetails", movieDetails);

                        // Drawing a line as a separator
            doc.moveTo(marginLeft, yPosition).lineTo(marginLeft + 4 * columnGap, yPosition).stroke();
 
            doc.fontSize(rowFontSize).text(`Movie Name: ${movieDetails.movieName || 'N/A'}`, marginLeft, yPosition + 20);
            console.log(movieDetails.movieName);
            
            doc.text(`Description: ${movieDetails.movieDesc || 'N/A'}`, marginLeft, yPosition + 40);
            doc.text(`Runtime: ${movieDetails.movieDuration ? `${movieDetails.movieDuration} min` : 'N/A'}`, marginLeft, yPosition + 66);
            doc.text(
                `Release Date: ${
                    movieDetails.movieReleaseDate ? new Date(movieDetails.movieReleaseDate).toISOString().slice(0, 10) : 'N/A'
                }`,
                marginLeft,
                yPosition + 80
            );
            doc.text(`Rating: ${movieDetails.movieRating ? movieDetails.movieRating.toString() : 'N/A'}`, marginLeft, yPosition + 100);
            doc.text(`Movie Genre: ${movieDetails.movieGenre || 'N/A'}`, marginLeft, yPosition + 120);
           
             // Incrementing the vertical position for the next movie details
            yPosition += 180;
        } else {
            doc.fontSize(rowFontSize).text(`Details unavailable`, marginLeft, yPosition);
            yPosition += 40;
        }
    });
 
        // Drawing a line as a separator at the bottom
    doc.moveTo(marginLeft, yPosition).lineTo(marginLeft + 4 * columnGap, yPosition).stroke();
 
    return doc;
};