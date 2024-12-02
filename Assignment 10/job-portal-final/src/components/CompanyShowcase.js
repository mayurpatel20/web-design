
import React, { useEffect, useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";

function CompanyShowcase() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
  
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/images"); 
 
        if (!response.ok) {
          throw new Error('HTTP error! status: ${response.status}');
        }

        const data = await response.json();
        console.log(data);
        setCompanies(data); 
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Company Showcase</h2>
      <ImageList cols={3} rowHeight={400}>
        {companies.map((company, index) => (
          <ImageListItem key={index}>
            <img src={company.img} alt={company.title} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default CompanyShowcase;
