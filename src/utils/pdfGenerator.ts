import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface TripPlan {
  destination: string;
  days: number;
  budget: string;
  travelType: string;
  currency: string;
  totalCost: number;
  hotels: any[];
  itinerary: any[];
}

export const generateTripPDF = async (tripPlan: TripPlan, profileName: string) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper function to add text with word wrap
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.35);
  };

  // Header
  pdf.setFillColor(34, 197, 94); // Blue background
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Journey_Explore', 20, 25);
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text('AI-Powered Travel Planner', 20, 32);

  // Trip Title
  yPosition = 55;
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  yPosition = addText(`Trip to ${tripPlan.destination}`, 20, yPosition, pageWidth - 40, 20);

  // Trip Details
  yPosition += 10;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  
  const currencySymbols: { [key: string]: string } = {
    USD: '$', EUR: '€', GBP: '£', JPY: '¥', INR: '₹'
  };
  const symbol = currencySymbols[tripPlan.currency] || '₹';

  yPosition = addText(`Planned by: ${profileName}`, 20, yPosition, pageWidth - 40);
  yPosition = addText(`Duration: ${tripPlan.days} days`, 20, yPosition, pageWidth - 40);
  yPosition = addText(`Budget: ${tripPlan.budget} (${symbol}${tripPlan.totalCost.toLocaleString()})`, 20, yPosition, pageWidth - 40);
  yPosition = addText(`Travel Type: ${tripPlan.travelType}`, 20, yPosition, pageWidth - 40);
  yPosition = addText(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition, pageWidth - 40);

  // Hotels Section
  yPosition += 15;
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  yPosition = addText('Recommended Hotels', 20, yPosition, pageWidth - 40, 16);

  yPosition += 5;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  
  tripPlan.hotels.forEach((hotel) => {
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFont('helvetica', 'bold');
    yPosition = addText(`${hotel.name}`, 25, yPosition, pageWidth - 50);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(`Rating: ${hotel.rating}/5 | ${symbol}${hotel.pricePerNight.toLocaleString()}/night`, 25, yPosition, pageWidth - 50);
    yPosition = addText(`Location: ${hotel.location}`, 25, yPosition, pageWidth - 50);
    yPosition = addText(`Amenities: ${hotel.amenities.join(', ')}`, 25, yPosition, pageWidth - 50);
    yPosition += 8;
  });

  // Itinerary Section
  yPosition += 10;
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  yPosition = addText('Day-by-Day Itinerary', 20, yPosition, pageWidth - 40, 16);

  tripPlan.itinerary.forEach((day) => {
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 20;
    }

    yPosition += 10;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText(`Day ${day.day}`, 20, yPosition, pageWidth - 40, 14);

    // Activities
    day.activities.forEach((activity: any) => {
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      yPosition = addText(`${activity.name}`, 25, yPosition, pageWidth - 50);
      pdf.setFont('helvetica', 'normal');
      yPosition = addText(`${activity.description}`, 25, yPosition, pageWidth - 50);
      yPosition = addText(`Duration: ${activity.duration} | Cost: ${symbol}${activity.cost.toLocaleString()} | Location: ${activity.location}`, 25, yPosition, pageWidth - 50);
      yPosition += 5;
    });

    // Meals
    if (day.meals && day.meals.length > 0) {
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Recommended Meals:', 25, yPosition, pageWidth - 50);
      pdf.setFont('helvetica', 'normal');
      
      day.meals.forEach((meal: any) => {
        yPosition = addText(`${meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}: ${meal.name} (${symbol}${meal.cost.toLocaleString()})`, 30, yPosition, pageWidth - 60);
      });
      yPosition += 5;
    }
  });

  // Cost Breakdown
  if (yPosition > pageHeight - 80) {
    pdf.addPage();
    yPosition = 20;
  }

  yPosition += 15;
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  yPosition = addText('Cost Breakdown', 20, yPosition, pageWidth - 40, 16);

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  
  const hotelCost = tripPlan.hotels.reduce((sum, hotel) => sum + (hotel.pricePerNight * tripPlan.days), 0);
  const activityCost = tripPlan.itinerary.reduce((sum, day) => 
    sum + day.activities.reduce((daySum: number, activity: any) => daySum + activity.cost, 0), 0
  );
  const mealCost = tripPlan.itinerary.reduce((sum, day) => 
    sum + (day.meals ? day.meals.reduce((daySum: number, meal: any) => daySum + meal.cost, 0) : 0), 0
  );

  yPosition = addText(`Accommodation: ${symbol}${hotelCost.toLocaleString()}`, 25, yPosition, pageWidth - 50);
  yPosition = addText(`Activities: ${symbol}${activityCost.toLocaleString()}`, 25, yPosition, pageWidth - 50);
  yPosition = addText(`Meals: ${symbol}${mealCost.toLocaleString()}`, 25, yPosition, pageWidth - 50);
  yPosition += 5;
  pdf.setFont('helvetica', 'bold');
  yPosition = addText(`Total Estimated Cost: ${symbol}${tripPlan.totalCost.toLocaleString()}`, 25, yPosition, pageWidth - 50);

  // Footer
  const footerY = pageHeight - 15;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(128, 128, 128);
  pdf.text('Generated by Journey_Explore - Your AI-Powered Travel Companion', 20, footerY);
  pdf.text(`Page ${pdf.internal.getNumberOfPages()}`, pageWidth - 30, footerY);

  // Save the PDF
  const fileName = `${tripPlan.destination.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_trip_plan.pdf`;
  pdf.save(fileName);
};
