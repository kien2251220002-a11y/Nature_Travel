*** Settings ***
Documentation    Tour detail tests (POM)
Resource         ../resources/page_objects/TourDetailPage.resource
Suite Teardown   Close Application
Test Teardown    Capture Screenshot For Test    tour_detail

*** Variables ***
${BASE_URL}    http://127.0.0.1:3001

*** Test Cases ***
Tour Detail Page Loads
	[Documentation]    Open tour detail page and verify key elements are present.
	Go To Tour Detail Page    ${BASE_URL}

Tour Detail Loads
	[Documentation]    Open a tour detail page and verify key elements are present.
	Go To Tour Detail Page    ${BASE_URL}
	Verify Tour Detail Elements Present

Tour Detail Badge Visible
	[Documentation]    Verify tour detail badge and location are displayed.
	Go To Tour Detail Page    ${BASE_URL}
	Verify Tour Detail Elements Present

Tour Detail With Expected Title
	[Documentation]    Verify tour detail content matches expected title.
	Go To Tour Detail Page    ${BASE_URL}
	Verify Tour Detail Content    Vịnh Hạ Long Kỳ Quan Thiên Nhiên

Book Tour Button Click
	[Documentation]    Click book tour button and verify navigation.
	Go To Tour Detail Page    ${BASE_URL}
	Click Book Tour
