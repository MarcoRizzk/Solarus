# Solarus
Employee Portal
Overview
This project is designed to create an employee portal that matches the provided design and experience. The design, which is in Arabic, can be found in the “UI Design” section. The goal is to deliver a high-quality result that meets the following requirements:

Requirements
Employees Page
List of Employees: Display a list of all employees retrieved from a fake service API.
Responsive Table View: The table should be responsive, adapting to various screen sizes.
Sorting: The table should support sorting functionality as indicated in the design.
Dynamic Filter:
The filter component can be collapsed and expanded, ideally with a simple animation.
The filter is a dynamic form with configuration provided at the end of this document.
The filter form includes three dropdown inputs:
By Job
By Condition
By Access
Filter Behavior:
When a filter is applied, the page URL should update with the filter values as query parameters.
On page refresh, if the URL contains filter values, the filter inputs should initialize with the selected values from the URL.
Design
Colors:
Primary: #2D4190
Secondary: #E35C9C
Positive: #28BE89
Negative: #E65151
Font: Almarai
Services
Fake Employee Service: A service to retrieve all employees in JSON format.
Fake Filter Configuration Service: A service to retrieve filter configuration in JSON format.
Sharing Results
Figma Design: Inspect the design on Figma and ensure you are in “Dev Mode”.
How to Run
Clone the Repository:

bash
Copy code
git clone [GitHub Repository Link]
cd [Repository Directory]
Install Dependencies:

bash
Copy code
npm install
Run the Application:

bash
Copy code
ng serve
Access the Application:
Open your browser and navigate to http://localhost:4200/

Conclusion
This project demonstrates the ability to create a dynamic, responsive employee portal with sorting and filtering capabilities. The implementation follows the given design and user stories closely, ensuring a high-quality user experience.
