*** Settings ***
Library    SeleniumLibrary
Resource    ../common_keywords.resource

*** Variables ***
${TOUR_DETAIL_PATH}    /tour-detail
${DEFAULT_TOUR_ID}    1
${DEFAULT_BASE_URL}    http://127.0.0.1:3001

*** Keywords ***
Go To Tour Detail Page
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}    ${tour_id}=${DEFAULT_TOUR_ID}
    ${url}=    Set Variable    ${base_url}${TOUR_DETAIL_PATH}?id=${tour_id}
    Open Application    ${url}

Verify Tour Detail Elements Present
    Wait Until Element Is Visible    id=tour-detail-title    timeout=10s
    Element Should Be Visible    id=tour-detail-badge-duration
    Element Should Be Visible    id=tour-detail-location-text
    Element Should Be Visible    id=tour-detail-desc
    Element Should Be Visible    id=btn-book-tour

Verify Tour Detail Content    [Arguments]    ${expected_title}
    Wait Until Element Contains    id=tour-detail-title    ${expected_title}    timeout=10s
    Element Should Contain    id=tour-detail-title    ${expected_title}

Click Book Tour
    Wait Until Keyword Succeeds    10 times    1s    Click Tour Detail Booking Button
    Wait Until Location Contains    /booking    timeout=10s

Click Tour Detail Booking Button
    Wait Until Element Is Visible    id=btn-book-tour    timeout=10s
    Scroll Element Into View    id=btn-book-tour
    ${href}=    Get Element Attribute    id=btn-book-tour    href
    Should Contain    ${href}    ?tourId=
    Click Element    id=btn-book-tour
