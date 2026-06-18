*** Settings ***
Documentation    Register tests (POM)
Resource         ../resources/page_objects/RegisterPage.resource
Suite Teardown   Close Application
Test Teardown    Capture Screenshot For Test    register

*** Variables ***
${BASE_URL}    http://127.0.0.1:3001

*** Test Cases ***
Register Page Loads
	[Documentation]    Open register page and verify the registration form appears.
	Go To Register Page    ${BASE_URL}
	Wait Until Element Is Visible    id=full-name-input    timeout=5s

Register New User
	[Documentation]    Open register page and submit new user registration (sanity).
	Go To Register Page    ${BASE_URL}
	${rnd}=    Evaluate    str(int(random()*10000))    modules=random
	${name}=    Set Variable    Test User ${rnd}
	${email}=    Set Variable    user${rnd}@example.com
	Register New User    ${name}    ${email}    0901234${rnd}    secret123
	Wait Until Element Is Visible    id=navbar    timeout=5s

Register With Short Password
	[Documentation]    Show validation error when password is shorter than six characters.
	Go To Register Page    ${BASE_URL}
	Input Text    id=full-name-input    Short Pass
	Input Text    id=email-input    shortpass@example.com
	Input Text    id=phone-input    0900000000
	Input Text    id=password-input    123
	Input Text    id=confirm-password-input    123
	Click Element    id=terms-checkbox
	Click Element    id=btn-register
	Wait Until Element Contains    id=toast-notification    Mật khẩu phải dài ít nhất 6 ký tự.    timeout=5s

Register With Mismatched Passwords
	[Documentation]    Show validation error when passwords do not match.
	Go To Register Page    ${BASE_URL}
	Input Text    id=full-name-input    Bad Confirm
	Input Text    id=email-input    badconfirm@example.com
	Input Text    id=phone-input    0900000001
	Input Text    id=password-input    secret123
	Input Text    id=confirm-password-input    secret321
	Click Element    id=terms-checkbox
	Click Element    id=btn-register
	Wait Until Element Contains    id=toast-notification    Mật khẩu xác nhận không trùng khớp.    timeout=5s

Register Without Accepting Terms
	[Documentation]    Show validation error when terms are not checked.
	Go To Register Page    ${BASE_URL}
	Input Text    id=full-name-input    No Terms
	Input Text    id=email-input    noterms@example.com
	Input Text    id=phone-input    0900000002
	Input Text    id=password-input    secret123
	Input Text    id=confirm-password-input    secret123
	Click Element    id=btn-register
	Wait Until Element Contains    id=toast-notification    Bạn phải đồng ý với Điều khoản dịch vụ.    timeout=5s
