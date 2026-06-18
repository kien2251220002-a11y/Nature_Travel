*** Settings ***
Documentation    Tour detail tests (POM)
Resource         ../resources/page_objects/TourDetailPage.resource
Suite Teardown   Close Application
Test Teardown    Capture Screenshot For Test    tour_detail

*** Variables ***
${BASE_URL}    http://127.0.0.1:5173
${DETAIL_PATH}    /pages/tours/tour_detail/tour_detail.html

*** Test Cases ***
Tour Detail Page Loads
	[Documentation]    Open tour detail page and verify key elements are present.
	Go To Tour Detail Page    ${BASE_URL}
	Wait Until Element Is Visible    id=tour-detail-title    timeout=5s

Tour Detail Loads
	[Documentation]    Open a tour detail page and verify key elements are present.
	${url}=    Set Variable    ${BASE_URL}${DETAIL_PATH}
	Open Application    ${url}
	Wait Until Element Is Visible    id=tour-detail-title    timeout=5s
	Element Should Be Visible    id=tour-detail-desc
	Element Should Be Visible    id=btn-book-tour

Tour Detail Badge Visible
	[Documentation]    Verify tour detail badge and location are displayed.
	Go To Tour Detail Page    ${BASE_URL}
	Verify Tour Detail Elements Present

Tour Detail With Expected Title
	[Documentation]    Verify tour detail content matches expected title.
	Go To Tour Detail Page    ${BASE_URL}
	Verify Tour Detail Content    Tour

Book Tour Button Click
	[Documentation]    Click book tour button and verify navigation.
	Go To Tour Detail Page    ${BASE_URL}
	Click Book Tour
	Sleep    0.5s
