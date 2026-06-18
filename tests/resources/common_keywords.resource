*** Settings ***
Library    SeleniumLibrary
Library    DateTime
Library    OperatingSystem
Library    String

*** Variables ***
${BROWSER}    chrome
${IMPLICIT_WAIT}    2s

*** Keywords ***
Open Application
    [Arguments]    ${url}
    Open Browser    ${url}    ${BROWSER}
    Set Window Size    1920    1080
    Set Selenium Implicit Wait    ${IMPLICIT_WAIT}
    Maximize Browser Window

Close Application
    Close All Browsers

Click And Wait
    [Arguments]    ${locator}
    Click Element    ${locator}
    Sleep    0.5s

Capture Screenshot For Test
    [Arguments]    ${feature}
    ${test_name}=    Set Variable    ${TEST NAME}
    ${safe_test_name}=    Replace String    ${test_name}    ${SPACE}    _
    ${directory}=    Set Variable    ${CURDIR}/../screenshot/${feature}
    Create Directory    ${directory}
    Capture Page Screenshot    ${directory}/${safe_test_name}.png
