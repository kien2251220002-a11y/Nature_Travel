*** Settings ***
Resource    ../common_keywords.resource

*** Variables ***
${LOGIN_PATH}    /pages/auth/login/login.html
${DEFAULT_BASE_URL}    http://127.0.0.1:3001

*** Keywords ***
Go To Login Page
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}
    ${url}=    Set Variable    ${base_url}${LOGIN_PATH}
    Open Application    ${url}
    Wait Until Element Is Visible    id=login-form    timeout=10s
    Wait Until Element Is Visible    id=btn-login    timeout=10s

Login With Credentials
    [Arguments]    ${email}    ${password}
    Wait Until Element Is Visible    id=email-input    timeout=10s
    Input Text    id=email-input    ${email}
    Wait Until Element Is Visible    id=password-input    timeout=10s
    Input Text    id=password-input    ${password}
    Wait Until Element Is Enabled    id=btn-login    timeout=10s
    Scroll Element Into View    id=btn-login
    Click Element    id=btn-login
    Wait Until Location Contains    /profile    timeout=15s
    Wait Until Element Is Visible    id=navbar    timeout=10s