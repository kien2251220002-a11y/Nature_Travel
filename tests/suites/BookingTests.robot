*** Settings ***
Documentation    Booking tests (POM)
Resource         ../resources/page_objects/BookingPage.resource
Suite Teardown   Close Application
Test Teardown    Capture Screenshot For Test    booking

*** Variables ***
${BASE_URL}    http://127.0.0.1:5173

*** Test Cases ***
Booking Page Loads
	[Documentation]    Open booking page and verify the booking form is visible.
	Go To Booking Page    ${BASE_URL}
	Wait Until Element Is Visible    id=booking-date-input    timeout=5s

Fill Booking Form And Submit
	[Documentation]    Open booking page, fill the form and verify summary updates.
	Go To Booking Page    ${BASE_URL}
	${today}=    Get Current Date    result_format=%Y-%m-%d
	Fill Booking Form    ${today}    2    1    Vegan meal
	Wait Until Element Is Visible    id=summary-grand-total    timeout=5s

Booking Without Date Shows Error
	[Documentation]    Verify booking validation when date is missing.
	Go To Booking Page    ${BASE_URL}
	Input Text    id=adults-input    2
	Input Text    id=children-input    1
	Click Element    id=booking-submit-btn
	Wait Until Element Is Visible    id=toast-notification    timeout=5s

Booking Without Adults Shows Error
	[Documentation]    Verify booking validation when adult count is missing.
	Go To Booking Page    ${BASE_URL}
	${today}=    Get Current Date    result_format=%Y-%m-%d
	Input Text    id=booking-date-input    ${today}
	Input Text    id=children-input    1
	Click Element    id=booking-submit-btn
	Wait Until Element Is Visible    id=toast-notification    timeout=5s

Booking With Children And Note Shows Summary
	[Documentation]    Fill booking form with children and note, then verify summary updates.
	Go To Booking Page    ${BASE_URL}
	${today}=    Get Current Date    result_format=%Y-%m-%d
	Fill Booking Form    ${today}    1    2    Need baby seat
	Wait Until Element Is Visible    id=summary-grand-total    timeout=5s
