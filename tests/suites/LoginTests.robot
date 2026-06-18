*** Settings ***
Documentation    Login tests (POM)
Resource         ../resources/page_objects/LoginPage.resource
Suite Teardown   Close Application
Test Teardown    Capture Screenshot For Test    login

*** Variables ***
${BASE_URL}    http://127.0.0.1:5173
${TEST_USER_EMAIL}    testuser@example.com
${TEST_USER_PASSWORD}    secret123

*** Test Cases ***
Successful Login
	[Documentation]    Open login page and perform successful login; verify navbar shown.
	Go To Login Page    ${BASE_URL}
	Login With Credentials    ${TEST_USER_EMAIL}    ${TEST_USER_PASSWORD}
	Wait Until Element Is Visible    id=navbar    timeout=5s

Invalid Login With Wrong Password
	[Documentation]    Enter bad credentials and verify error toast appears.
	Go To Login Page    ${BASE_URL}
	Input Text    id=email-input    ${TEST_USER_EMAIL}
	Input Text    id=password-input    wrongpass
	Click Element    id=btn-login
	Wait Until Element Contains    id=toast-notification    Đăng nhập    timeout=5s

Invalid Login With Missing Password
	[Documentation]    Leave password blank and verify validation message.
	Go To Login Page    ${BASE_URL}
	Input Text    id=email-input    ${TEST_USER_EMAIL}
	Input Text    id=password-input    ${EMPTY}
	Click Element    id=btn-login
	Wait Until Element Contains    id=toast-notification    Vui lòng điền đầy đủ email và mật khẩu.    timeout=5s

Invalid Login With Wrong Email
	[Documentation]    Enter an unknown email and verify error toast appears.
	Go To Login Page    ${BASE_URL}
	Input Text    id=email-input    wronguser@example.com
	Input Text    id=password-input    ${TEST_USER_PASSWORD}
	Click Element    id=btn-login
	Wait Until Element Is Visible    id=toast-notification    timeout=5s

Login Without Email
	[Documentation]    Leave the email blank and verify validation message appears.
	Go To Login Page    ${BASE_URL}
	Input Text    id=password-input    ${TEST_USER_PASSWORD}
	Click Element    id=btn-login
	Wait Until Element Is Visible    id=toast-notification    timeout=5s
