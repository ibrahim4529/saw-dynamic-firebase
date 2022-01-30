import { Rank } from "~/types/rank";
import { Store } from "./store";
import { Alternative } from "~/types/alternative";
import { Criteria, Type } from "~/types/criteria";

class Saw {
    private readonly alternatives: Array<Alternative> = []
    private criteria: Array<Criteria> = []

    constructor(alternatives: Array<Alternative>, criteria: Array<Criteria>) {
        this.alternatives = alternatives
        this.criteria = criteria
    }
    private switchMatrix(): Array<Array<number>> {
        const result: Array<Array<number>> = [];

        this.criteria.forEach((_, index) => {
            let temp: Array<number> = [];
            this.alternatives.forEach((_, indexes) => {
                temp.push(this.alternatives[indexes].values[index]);
            });
            result.push(temp);
        });

        return result;
    }

    private getMinMax(): Array<number> {
        const _alternatives = this.switchMatrix();
        const result: Array<number> = [];

        this.criteria.forEach((value, index) => {
            if (value.type === Type.BENEFIT) {
                result.push(Math.max(..._alternatives[index]));
            } else {
                result.push(Math.min(..._alternatives[index]));
            }
        });

        return result;
    }

    private weightToPercent(): Array<number> {
        return [... this.criteria.map((value => value.weight / 100))]
    }

    private normalization(): Array<Array<number>> {
        const results: Array<Array<number>> = []
        const columns = this.getMinMax();
        this.alternatives.forEach((alt) => {
            let map = alt.values.map(((value, index) => {
                if(value === 0){
                    value = 1;
                }
                if (this.criteria[index].type === Type.BENEFIT) {
                    return value / columns[index]
                } else {
                    return columns[index] / value
                }
            }))
            results.push(map)
        })
        return results
    }
    private weightedNorm(): Array<number> {
        const results: Array<number> = []
        const weight = this.weightToPercent();
        const norm = this.normalization();

        norm.forEach((value) => {
            let map: number = 0;
            value.map(((value1, index) => (map += weight[index] * value1)));
            results.push(map)
        })
        return results
    }
    private calculateRank(): Array<Rank> {
        const wn = this.weightedNorm();
        const _an = this.alternatives

        const result: Array<Rank> = []
        _an.map((_, index) => {
            result.push({
                alternative: _an[index],
                result: wn[index]
            })
        })
        return result.sort((a, b) => a.result - b.result).reverse()
    }

    public process(): Array<Rank> {
        return this.calculateRank();
    }
}
interface SawObject {
    saw: Saw | null
    ranks: Array<Rank>
    isProcess: boolean
}
export const saw = (
    alternatives: Array<Alternative>,
    criteria: Array<Criteria>
) => new Saw(alternatives, criteria);

class SawStore extends Store<SawObject>{
    reset() {
        this.state.saw = null
        this.state.ranks = []
    }

    setSaw(saw: Saw) {
        this.state.saw = saw;
    }
    protected data(): SawObject {
        return {
            ranks: [],
            isProcess: false,
            saw: null
        }
    }

    calculateRank() {
        if (this.state.saw != null) {
            this.state.isProcess = true
            this.state.ranks = this.state.saw.process()
            this.state.isProcess = false
        }
    }
}

export const sawStore: SawStore = new SawStore()