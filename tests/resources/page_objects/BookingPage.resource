*** Settings ***
Resource    ../common_keywords.resource

*** Variables ***
${BOOKING_PATH}    /pages/booking/booking.html?tourId=1
${DEFAULT_BASE_URL}    http://127.0.0.1:3001

*** Keywords ***
Go To Booking Page
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}
    ${url}=    Set Variable    ${base_url}${BOOKING_PATH}
    ${go_status}=    Run Keyword And Ignore Error    Go To    ${url}
    Run Keyword If    '${go_status[0]}' == 'FAIL'    Open Browser    ${url}    ${BROWSER}
    Wait Until Element Is Visible    id=booking-reserve-form    timeout=10s
    Wait Until Element Is Visible    id=booking-date-input    timeout=10s

Fill Booking Form    [Arguments]    ${date}    ${adults}=1    ${children}=0    ${note}=
    Wait Until Element Is Visible    id=booking-date-input    timeout=10s
    Input Text    id=booking-date-input    ${date}
    Wait Until Element Is Visible    id=adults-input    timeout=10s
    Input Text    id=adults-input    ${adults}
    Wait Until Element Is Visible    id=children-input    timeout=10s
    Input Text    id=children-input    ${children}
    Wait Until Element Is Visible    id=booking-note-input    timeout=10s
    Input Text    id=booking-note-input    ${note}
    Submit Booking Form

Submit Booking Form
    Wait Until Element Is Enabled    id=booking-submit-btn    timeout=10s
    Scroll Element Into View    id=booking-submit-btn
    Sleep    0.5s
    Execute JavaScript    document.getElementById('booking-submit-btn').click();
