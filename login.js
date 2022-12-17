function openSignup(){
    $(signupBox).css("display", "flex");
};


// 모달 바깥영역 선택시 창 닫기
$(signupBox).click((e)=>{
    const target = e.target;
    if(target.id === "signupBox"){
        $(target).css("display", "none");
    }else if(target.id === "signupBtn"){
        $(signupFrm).submit();
    }
    else{
        e.preventDefault();
    }
});

/**
 * 회원 클래스 생성
 */
class Memeber{
    constructor(userId, password, userName, birthDay, gender, email, tel){
        this.userId = userId;
        this.password = password;
        this.userName = userName;
        this.birthDay = birthDay;
        this.gender = gender;
        this.eamil = email;
        this.tel = tel;
    };
};

/**
 * 회원가입 조건 메소드
 */
$(signupFrm).on("submit", () => {
    console.log("ddd");
    // 1. 아이디 검사
    const id = signupId.value;
    // 아이디의 길이 4~12글자 사이
    if(!/^.{4,12}$/.test(id)){
        idErr.innerHTML = "아이디는 4~12자리로 이뤄져야 합니다.";
        signupId.focus();
        return false;
    }
    // 아이디는 반드시 영소문자로 시작해야한다.
    if(!/^[a-z]/.test(id)){
        idErr.innerHTML = "아이디의 첫글자는 반드시 영소문자로 입력해야 합니다.";
        signupId.focus();
        return false;
    }
    // 아이디는 영소문자와 숫자의 조합으로만 이뤄져야한다.
    if(/[^0-9a-z]/.test(id)){
        idErr.innerHTML = "아이디는 영소문자와 숫자의 조합으로만 이뤄져야 합니다.";
        signupId.focus();
        return false;
    }

    // 아이디 중복검사
    const overlap = overlapId(id);
    console.log(overlap);
    if(!overlap){
        idErr.innerHTML = "이미 존재하는 아이디입니다.";
        signupId.focus();
        return false;
    }

    // 2. 비밀번호 검사
    const pw = signupPw.value;
    // 자리수 검사
    if(!/.{8,15}/.test(pw)){
        pwErr.innerHTML = "비밀번호는 8~15자리로 이뤄져야 합니다."
        signupPw.focus();
        return false;
    }
    // 숫자 검사
    if(!/\d/.test(pw)){
        pwErr.innerHTML = "비밀번호는 하나 이상의 숫자를 반드시 포함해야 합니다.";
        signupPw.focus();
        return false;
    }
    // 문자 검사
    if(!/[a-zㅏ-ㅣㄱ-ㅎ]/i.test(pw)){
        pwErr.innerHTML = "비밀번호는 하나 이상의 문자를 반드시 포함해야 합니다.";
        signupPw.focus();
        return false;
    }
    // 특수문자 검사
    if(!/[!@#$%^&*()]/.test(pw)){
        pwErr.innerHTML = "비밀번호는 하나 이상의 특수문자를 반드시 포함해야 합니다.";
        signupPw.focus();
        return false;
    }
    
    // 3. 비밀번호일치여부 검사
    const pwc = document.getElementById("signupPw-confirmation").value;
    if(pw !== pwc){
        pwcErr.innerHTML = "비밀번호가 일치하지 않습니다.";
        document.getElementById("signupPw-confirmation").focus();
        return false;
    }

    // 4. 이름검사
    const name = userName.value
    // 한글2글자 이상만 허용. 
    if(!/^[가-힣]{2,}$/.test(name)){
        nameErr.innerHTML = "2글자 이상의 한글 이름을 입력해주세요.";
        userName.focus();
        return false;
    }

    // 5. 생년월일
    // 년도 검사
    const birthYear = document.getElementById("birthYear").value;
    const nowYear = new Date().getFullYear();
    if(birthYear > nowYear){
        birthErr.innerHTML = "유효하지 않는 생년월일입니다."
        document.getElementById("birthYear").focus();
        return false;
    }
    // 일 검사
    const birthDay = document.getElementById("birthDay").value;
    if(birthDay < 1){
        birthErr.innerHTML = "유효하지 않는 생년월일입니다."
        document.getElementById("birthDay").focus();
        return false;
    }
    if(birthDay > 31){
        birthErr.innerHTML = "유효하지 않는 생년월일입니다."
        document.getElementById("birthDay").focus();
        return false;
    }
    const birth = `${birthYear}-${birthMonth.value}-${birthDay}`;
    const gender = document.getElementById("gender").value;

    // 6. 휴대폰번호 검사
    // 자리수 검사
    if(!/\d{2,}/.test(tel1.value)){
        phoneErr.innerText = "잘못된 전화번호입니다.";
        tel1.focus();
        return false;
    }
    if(!/\d{3,}/.test(tel2.value)){
        phoneErr.innerText = "잘못된 전화번호입니다.";
        tel2.focus();
        return false;
    }
    if(!/\d{4,}/.test(tel3.value)){
        phoneErr.innerText = "잘못된 전화번호입니다.";
        tel3.focus();
        return false;
    }
    const email = document.getElementById("email")?.value  || "없음";
    const phoneNum = `${tel1.value}-${tel2.value}-${tel3.value}`;

    const newMember = new Memeber(id, pw, name, birth, gender, email, phoneNum);

    saveMember(newMember);

    alert("회원가입 완료!");
    $(signupBox).css("display", "none");
    return true;
});

/**
 * 회원정보 저장 메소드
 */
const saveMember = (newMember) => {
    const members = JSON.parse(localStorage.getItem("members")) || [];
    members.push(newMember);
    localStorage.setItem("members", JSON.stringify(members));
};

/**
 * 아이디 중복검사 메소드
 */
const overlapId = (id) => {
    const members = JSON.parse(localStorage.getItem("members")) || [];
    let bool = true;
    members.forEach((member)=>{
        if(id === member.userId){
            bool = false;
        }
    });
    return bool;
};

/**
 * 로그인 메소드
 */
loginFrm.addEventListener("submit",()=>{
    // 입력값 가져오기
    const id = userId.value;
    const pw = password.value;
    // 회원목록 불러오기
    const members = JSON.parse(localStorage.getItem("members"));

    // 비교검사하기
    let cnt = 0;
    members?.forEach((member)=>{
        if(id === member.userId){
            cnt++;
            if(pw === member.password){
                cnt++;
                sessionStorage.setItem("user", JSON.stringify(member));
                return;
            }
        }
    });
    // 결과출력
    switch(cnt){
        case 0 : alert("존재하지 않는 아이디입니다."); return false;
        case 1 : alert("비밀번호가 일치하지 않습니다."); return false;
        case 2 : 
            open("index.html", "_self");
            alert("정상적으로 로그인이 됐습니다.");
            return true;
        }
});

