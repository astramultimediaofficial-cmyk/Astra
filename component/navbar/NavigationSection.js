"use client";
import React from "react";
import { useAstraContext } from "@/context/AstraContext";
import Navlink from "./Navlink";
import SubNavlink from "./SubNavlink";

const NavigationSection = ({ position, btnPosition, navRef }) => {
  const { isMobileNavOpen } = useAstraContext();
  return (
    <div
      ref={navRef}
      className={`collapse navbar-collapse ${isMobileNavOpen ? "show" : ""}`}
      id="navbarNav"
    >
      <ul className={`navbar-nav ${position}`}>
        <li className="nav-item">
          <Navlink href="/">Home</Navlink>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            Our Courses <i className="fa fa-angle-down"></i>
          </a>
          <ul className="tf__droap_menu">
            <li>
              <SubNavlink href="/courses">Graphic Design</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/courses">2D & 3D Animation</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/courses">VFX</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/courses">Video Editing</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/courses">Digital Marketing</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/courses">UI/UX</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/courses">SAP</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/courses">Web Development</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/courses">DSA</SubNavlink>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Navlink href="/team">Mentors</Navlink>
        </li>
        <li className="nav-item">
          <Navlink href="/about">About Us</Navlink>
        </li>
        <li className="nav-item">
          <Navlink href="/contact">Contact</Navlink>
        </li>
        {btnPosition ? null : (
          <li className="nav-item">
            <a
              className="nav-link common_btn"
              href="https://wa.me/919677606913?text=Hi!%20I%20would%20like%20to%20enroll%20today."
              target="_blank"
              rel="noopener noreferrer"
            >
              ENROLL TODAY
            </a>
          </li>
        )}
      </ul>
      {btnPosition ? (
        <a
          className="common_btn_2 ms-auto"
          href="https://wa.me/919677606913?text=Hi!%20I%20would%20like%20to%20enroll%20today."
          target="_blank"
          rel="noopener noreferrer"
        >
          ENROLL TODAY
        </a>
      ) : null}
    </div>
  );
};

export default NavigationSection;
