*** Settings ***
Resource    ../common_keywords.resource

*** Variables ***
${BOOKING_PATH}    /pages/booking/booking.html?tourId=1
${DEFAULT_BASE_URL}    http://127.0.0.1:5173

*** Keywords ***
Go To Booking Page
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}
    ${url}=    Set Variable    ${base_url}${BOOKING_PATH}
    Open Application    ${url}

Fill Booking Form    [Arguments]    ${date}    ${adults}=1    ${children}=0    ${note}=
    Input Text    id=booking-date-input    ${date}
    Input Text    id=adults-input    ${adults}
    Input Text    id=children-input    ${children}
    Input Text    id=booking-note-input    ${note}
    Click Element    id=booking-submit-btn
    Wait Until Element Is Visible    id=summary-grand-total    timeout=5s
