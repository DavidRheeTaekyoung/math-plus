// 스코어링 모듈 - 점수 계산, 콤보, 배율 관리

class ScoringSystem {
    constructor() {
        this.score = 0;
        this.correctCount = 0;
        this.totalQuestions = 0;
        this.combo = 0;
        this.negativeCombo = 0;
        this.levelMultiplier = 1.0;
    }

    // 초기화
    reset() {
        this.score = 0;
        this.correctCount = 0;
        this.totalQuestions = 0;
        this.combo = 0;
        this.negativeCombo = 0;
    }

    // 레벨 배율 설정
    setLevelMultiplier(multiplier) {
        this.levelMultiplier = multiplier;
    }

    // 정답 처리
    handleCorrect() {
        this.totalQuestions++;
        this.negativeCombo = 0; // 오답 콤보 리셋
        
        const baseScore = 10 + (this.combo * 2);
        const scoreChange = Math.round(baseScore * this.levelMultiplier);
        
        this.score += scoreChange;
        this.correctCount++;
        this.combo++;
        
        return {
            scoreChange: scoreChange,
            totalScore: this.score,
            correctCount: this.correctCount,
            combo: this.combo,
            isSpecialCombo: this.combo === 5 || this.combo === 10 || this.combo === 15 || this.combo === 20 || this.combo % 10 === 0
        };
    }

    // 오답 처리
    handleWrong() {
        this.totalQuestions++;
        this.combo = 0; // 정답 콤보 리셋
        
        const basePenalty = 10 + (this.negativeCombo * 2);
        const scoreChange = -Math.round(basePenalty * this.levelMultiplier);
        
        this.score += scoreChange;
        this.negativeCombo++;
        
        return {
            scoreChange: scoreChange,
            totalScore: this.score,
            negativeCombo: this.negativeCombo
        };
    }

    // 현재 상태 가져오기
    getStats() {
        return {
            score: this.score,
            correctCount: this.correctCount,
            totalQuestions: this.totalQuestions,
            combo: this.combo,
            negativeCombo: this.negativeCombo,
            accuracy: this.totalQuestions > 0 ? Math.round((this.correctCount / this.totalQuestions) * 100) : 0
        };
    }
}

// 전역 인스턴스 export
window.ScoringSystem = ScoringSystem;
