// components/Globe.js

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const Globe = ({ width = 800, height = 800 }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        // Ensure this runs only on the client side
        if (typeof window !== 'undefined') {
            const svg = d3.select(svgRef.current)
                .attr('width', width)
                .attr('height', height);

            // Adjust projection scale and translate for non-square aspect ratios
            const projection = d3.geoOrthographic()
                .scale(Math.min(width, height) / 2.5)  // Scale based on the smaller dimension
                .translate([width / 2, height / 2])
                .rotate([0, -30]);

            const path = d3.geoPath().projection(projection);

            // Create the globe background
            svg.selectAll('.globe').remove();  // Remove previous globe if any
            svg.append('path')
                .datum({ type: 'Sphere' })
                .attr('class', 'globe')
                .attr('d', path)
                .attr('fill', 'white')  // Set globe background to white
                .attr('stroke', 'lightgrey')  // Set globe border to light grey
                .attr('stroke-width', 0.5);

            // Load and display the world map using d3.json
            d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json').then(worldData => {
                const countries = topojson.feature(worldData, worldData.objects.countries);

                svg.selectAll('.country').remove();  // Remove previous countries if any
                svg.selectAll('.country')
                    .data(countries.features)
                    .enter().append('path')
                    .attr('class', 'country')
                    .attr('d', path)
                    .attr('fill', 'lightgrey')  // Set country fill color to light grey
                    .attr('stroke', 'white');  // Set country border color to white
            });

            // Rotate the globe
            const rotateGlobe = () => {
                d3.timer(() => {
                    projection.rotate([Date.now() * 0.02 % 360, -30]); // Rotate based on time
                    svg.selectAll('path').attr('d', path);
                });
            };

            rotateGlobe();

            // Cleanup function to stop any timers on component unmount
            return () => {
                d3.selectAll('path').interrupt();
            };
        }
    }, [width, height]);  // Depend on width and height

    return <svg ref={svgRef}></svg>;
};

export default Globe;
