*** Settings ***
Library    SeleniumLibrary
Resource    ../common_keywords.resource

*** Variables ***
${TOUR_DETAIL_PATH}    /pages/tours/tour_detail/tour_detail.html
${DEFAULT_BASE_URL}    http://127.0.0.1:5173

*** Keywords ***
Go To Tour Detail Page
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}
    ${url}=    Set Variable    ${base_url}${TOUR_DETAIL_PATH}
    Open Application    ${url}

Verify Tour Detail Elements Present
    Wait Until Element Is Visible    id=tour-detail-title    timeout=5s
    Element Should Be Visible    id=tour-detail-badge-duration
    Element Should Be Visible    id=tour-detail-location-text
    Element Should Be Visible    id=tour-detail-desc
    Element Should Be Visible    id=btn-book-tour

Verify Tour Detail Content    [Arguments]    ${expected_title}
    Element Should Contain    id=tour-detail-title    ${expected_title}

Click Book Tour
    Click Element    id=btn-book-tour
    Sleep    0.5s
