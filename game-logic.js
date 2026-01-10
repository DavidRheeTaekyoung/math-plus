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
            // Level 1: 한 자리 + 한 자리 더하기 (합이 9 이하)
            do {
                n1 = this.r(1, 9);
                n2 = this.r(1, 9);
            } while (n1 + n2 > 9);
            this.currentAns = n1 + n2;
            this.currentOperator = '+';
            this.levelMultiplier = 1.0;
        } else if (difficulty === 2) {
            // Level 2: 한 자리 + 한 자리 더하기 (합이 18 이하)
            do {
                n1 = this.r(1, 9);
                n2 = this.r(1, 9);
            } while (n1 + n2 > 18);
            this.currentAns = n1 + n2;
            this.currentOperator = '+';
            this.levelMultiplier = 1.2;
        } else if (difficulty === 3) {
            // Level 3: 20 이하 랜덤 더하기
            do {
                n1 = this.r(1, 19);
                n2 = this.r(1, 19);
            } while (n1 + n2 > 20);
            this.currentAns = n1 + n2;
            this.currentOperator = '+';
            this.levelMultiplier = 1.4;
        } else {
            // Level 4: 두 자리 + 두 자리 더하기
            n1 = this.r(10, 99);
            n2 = this.r(10, 99);
            this.currentAns = n1 + n2;
            this.currentOperator = '+';
            this.levelMultiplier = 2.0;
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
