*** Settings ***
Documentation    Home page tests (POM)
Resource         ../resources/page_objects/HomePage.resource
Suite Teardown   Close Application
Test Teardown    Capture Screenshot For Test    home

*** Variables ***
${BASE_URL}    http://127.0.0.1:5173

*** Test Cases ***
Home Page Loads
	[Documentation]    Open home page and verify the search bar is visible.
	Go To Home Page    ${BASE_URL}
	Wait Until Element Is Visible    id=tour-search-input    timeout=5s

Hero Explore Navigates To Tours
	[Documentation]    From home, click explore and verify tours list loads.
	Go To Home Page    ${BASE_URL}
	Click Element    id=btn-hero-explore
	Wait Until Element Is Visible    id=tours-grid-container    timeout=5s

Search Tours With Query
	[Documentation]    Search tours using a query and verify results appear.
	Go To Home Page    ${BASE_URL}
	Search Tours    Adventure
	Wait Until Element Is Visible    id=featured-tours-grid    timeout=5s

Search Tours With Location
	[Documentation]    Search tours by location and verify results appear.
	Go To Home Page    ${BASE_URL}
	Search Tours    Adventure    Quảng Ninh
	Wait Until Element Is Visible    id=featured-tours-grid    timeout=5s

Search Tours With Price
	[Documentation]    Search tours by maximum price and verify results appear.
	Go To Home Page    ${BASE_URL}
	Search Tours    Adventure    ${EMPTY}    2500000
	Wait Until Element Is Visible    id=featured-tours-grid    timeout=5s
