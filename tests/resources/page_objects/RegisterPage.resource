*** Settings ***
Resource    ../common_keywords.resource

*** Variables ***
${REGISTER_PATH}    /pages/auth/register/register.html
${DEFAULT_BASE_URL}    http://127.0.0.1:3001

*** Keywords ***
Go To Register Page
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}
    ${url}=    Set Variable    ${base_url}${REGISTER_PATH}
    Open Application    ${url}
    Wait Until Element Is Visible    id=register-form    timeout=10s
    Wait Until Element Is Visible    id=btn-register    timeout=10s

Register New User    [Arguments]    ${fullname}    ${email}    ${phone}    ${password}
    Wait Until Element Is Visible    id=full-name-input    timeout=10s
    Input Text    id=full-name-input    ${fullname}
    Wait Until Element Is Visible    id=email-input    timeout=10s
    Input Text    id=email-input    ${email}
    Wait Until Element Is Visible    id=phone-input    timeout=10s
    Input Text    id=phone-input    ${phone}
    Wait Until Element Is Visible    id=password-input    timeout=10s
    Input Text    id=password-input    ${password}
    Wait Until Element Is Visible    id=confirm-password-input    timeout=10s
    Input Text    id=confirm-password-input    ${password}
    Wait Until Element Is Visible    id=terms-checkbox    timeout=10s
    Click Element    id=terms-checkbox
    Wait Until Element Is Enabled    id=btn-register    timeout=10s
    Scroll Element Into View    id=btn-register
    Click Element    id=btn-register
    Wait Until Element Is Visible    id=navbar    timeout=10s
