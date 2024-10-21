"use client";

import React from "react";

const Component = () => {
  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg">
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          <select id="organization" defaultValue="DMT" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="DMT">DMT</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            defaultValue="Al Buwam"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="class" className="block text-sm font-medium text-gray-700">
            Class
          </label>
          <select id="class" defaultValue="Zubara" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="Zubara">Zubara</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="classD" className="block text-sm font-medium text-gray-700">
            ClassD
          </label>
          <input
            id="classD"
            defaultValue="DMT"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select id="status" defaultValue="needs-review" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="needs-review">Needs Review</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <input
            id="comment"
            defaultValue="Imported from UAEU Atlas"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            id="description"
            defaultValue="Eastern and western"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="poems" className="block text-sm font-medium text-gray-700">
            Poems
          </label>
          <input
            id="poems"
            defaultValue="بيت الزوم وبه ... ما جرى الاحسان بالي شوالك بحر ... ما هو ما"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-arabic"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="stories" className="block text-sm font-medium text-gray-700">
            Stories
          </label>
          <input
            id="stories"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="classification" className="block text-sm font-medium text-gray-700">
            Classification
          </label>
          <select id="classification" defaultValue="marine" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="marine">Marine</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="municipality" className="block text-sm font-medium text-gray-700">
            Municipality
          </label>
          <select id="municipality" defaultValue="al-dhafra" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="al-dhafra">Al Dhafra</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="emirate" className="block text-sm font-medium text-gray-700">
            Emirate
          </label>
          <input
            id="emirate"
            defaultValue="Abu Dhabi"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="text-sm text-gray-500">X 54.2971051, Y 24.0622842</div>
      </div>
    </div>
  );
};

export default Component;
