// 게임 로직 모듈 - 레벨별 문제 생성 및 정답 체크

class GameLogic {
    constructor() {
        this.currentAns = 0;
        this.currentOperator = '+';
        this.difficulty = 1;
        this.levelMultiplier = 1.0;
    }

    // 난수 생성
    r(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 레벨별 문제 생성
    generateQuestion(difficulty) {
        this.difficulty = difficulty;
        let n1, n2;
        
        if (difficulty === 1) {
            // Level 1: 올림이 없는 한자리 더하기 (합이 9 이하)
            do {
                n1 = this.r(1, 9);
                n2 = this.r(1, 9);
            } while (n1 + n2 > 9);
            this.currentAns = n1 + n2;
            this.currentOperator = '+';
            this.levelMultiplier = 1.0;
        } else if (difficulty === 2) {
            // Level 2: 한자리 빼기
            n1 = this.r(2, 9);
            n2 = this.r(1, n1 - 1);
            this.currentAns = n1 - n2;
            this.currentOperator = '-';
            this.levelMultiplier = 2.0; // 더하기 1보다 1점 높게
        } else if (difficulty === 3) {
            // Level 3: 올림이 있는 한자리 더하기 (합이 10 이상 18 이하)
            do {
                n1 = this.r(1, 9);
                n2 = this.r(1, 9);
            } while (n1 + n2 < 10 || n1 + n2 > 18);
            this.currentAns = n1 + n2;
            this.currentOperator = '+';
            this.levelMultiplier = 1.5;
        } else if (difficulty === 4) {
            // Level 4: 두자리에서 한자리 빼기
            n1 = this.r(10, 99);
            n2 = this.r(1, 9);
            this.currentAns = n1 - n2;
            this.currentOperator = '-';
            this.levelMultiplier = 2.5; // 더하기 2보다 1점 높게
        } else if (difficulty === 5) {
            // Level 5: 20 이하 더하기
            do {
                n1 = this.r(1, 19);
                n2 = this.r(1, 19);
            } while (n1 + n2 > 20);
            this.currentAns = n1 + n2;
            this.currentOperator = '+';
            this.levelMultiplier = 2.0;
        } else if (difficulty === 6) {
            // Level 6: 20 이하 빼기
            n1 = this.r(2, 20);
            n2 = this.r(1, n1 - 1);
            this.currentAns = n1 - n2;
            this.currentOperator = '-';
            this.levelMultiplier = 3.0; // 더하기 3보다 1점 높게
        } else if (difficulty === 7) {
            // Level 7: 두자리 두자리 더하기
            n1 = this.r(10, 99);
            n2 = this.r(10, 99);
            this.currentAns = n1 + n2;
            this.currentOperator = '+';
            this.levelMultiplier = 4.0;
        } else if (difficulty === 8) {
            // Level 8: 두자리에서 두자리 빼기
            n1 = this.r(20, 99); // 최소 20으로 설정하여 n2가 10 이상이 되도록
            n2 = this.r(10, n1 - 1);
            this.currentAns = n1 - n2;
            this.currentOperator = '-';
            this.levelMultiplier = 6.0; // 더하기 4보다 2점 높게
        } else if (difficulty === 9) {
            // Level 9: 구구단 (곱해서 20 이하)
            do {
                n1 = this.r(2, 9);
                n2 = this.r(2, 9);
            } while (n1 * n2 > 20);
            this.currentAns = n1 * n2;
            this.currentOperator = '×';
            this.levelMultiplier = 7.0;
        } else if (difficulty === 10) {
            // Level 10: 구구단 (곱해서 20 초과)
            do {
                n1 = this.r(2, 9);
                n2 = this.r(2, 9);
            } while (n1 * n2 <= 20);
            this.currentAns = n1 * n2;
            this.currentOperator = '×';
            this.levelMultiplier = 8.0;
        } else if (difficulty === 11) {
            // Level 11: 2의 거듭제곱 (1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024)
            const powers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 2^0 ~ 2^10
            const power = powers[this.r(0, powers.length - 1)];
            n1 = 2;
            n2 = power;
            this.currentAns = Math.pow(2, power);
            this.currentOperator = '^';
            this.levelMultiplier = 9.0;
        } else if (difficulty === 12) {
            // Level 12: 3의 거듭제곱 (1, 3, 9, 27, 81, 243)
            const powers = [0, 1, 2, 3, 4, 5]; // 3^0 ~ 3^5
            const power = powers[this.r(0, powers.length - 1)];
            n1 = 3;
            n2 = power;
            this.currentAns = Math.pow(3, power);
            this.currentOperator = '^';
            this.levelMultiplier = 9.0;
        } else if (difficulty === 13) {
            // Level 13: 두자리수 × 한자리수 (10~19 × 1~9)
            n1 = this.r(10, 19);
            n2 = this.r(1, 9);
            this.currentAns = n1 * n2;
            this.currentOperator = '×';
            this.levelMultiplier = 10.0;
        } else {
            // Level 14: 제곱수 외우기 (1² ~ 19²)
            n1 = this.r(1, 19);
            n2 = 2; // 제곱 표시용
            this.currentAns = n1 * n1;
            this.currentOperator = '²';
            this.levelMultiplier = 11.0;
        }
        
        return {
            n1: n1,
            n2: n2,
            operator: this.currentOperator,
            answer: this.currentAns,
            multiplier: this.levelMultiplier
        };
    }

    // 정답 체크
    checkAnswer(userAnswer, userInputString) {
        const userInputLength = userInputString.length;
        const correctAnswerLength = String(this.currentAns).length;
        
        // 정답 체크
        if (userAnswer === this.currentAns) {
            return { isCorrect: true, isWrong: false };
        }
        
        // 오답 체크: 입력이 완료되었고 확실히 틀렸을 때만 오답 처리
        // 입력 자릿수가 정답 자릿수와 같거나 더 많을 때만 오답으로 판단
        const isInputComplete = userInputLength >= correctAnswerLength;
        
        if (isInputComplete && userAnswer !== this.currentAns) {
            return { isCorrect: false, isWrong: true };
        }
        
        // 아직 입력 중
        return { isCorrect: false, isWrong: false };
    }

    getCurrentAnswer() {
        return this.currentAns;
    }

    getLevelMultiplier() {
        return this.levelMultiplier;
    }
}

// 전역 인스턴스 export
window.GameLogic = GameLogic;
