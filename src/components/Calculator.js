import React, { useState, useEffect } from 'react';

/*
Your baby's weight in ounces / 6 / 8 = Ounces of breast milk per bottle

If you are using milliliters rather than ounces per bottle, multiply the result by 30.

24-30 ounces max
*/

const CONFIG = {
    minFeedings: 3,
    maxFeedings: 24,
    minAge: 1,
    maxAgeMonths: 6,
    minWeight: 5,
    maxWeight: 23,
    minWeightOunces: 0,
    maxWeightOunces: 15,
}

const errors = {
    'minFeedings': "We expect at least three feedings a day to calculate bottle size.",
    'maxFeedings': "If you're feeding once an hour, every hour, you should really talk to an expert.",
    'minAge': "Your baby has to be older than 1 week for us to calculate. Please talk to an expert to determine how much expressed colostrum or breastmilk your brand new baby needs.",
    'maxAge': "Once solids are introduced around 6mo, babies may drink less breastmilk, so we're not able to calculate.",
    'minWeight': "If your baby weighs less than 5lbs, you should really talk to an expert and not use an online calculator.",
    'maxWeight': "We don't believe in weight shaming, but your baby is heavier than the 98th percentile at age 6mo and beyond what we can calculate. We suggest talking to an expert to deterimine how much to feed.",
    'minWeightOunces': "Ounce value must be greater than or equal to 0.",
    'maxWeightOunces': "There are only 16 ounces in a pound, so you can't have more than 15 ounces in this calculation."

}

const milkCalculation = (weight, feedings, isMl = false) => {
    let {lbs, oz} = weight;

    lbs = parseInt(lbs, 10);
    oz = parseInt(oz, 10);

    const bottles = parseInt(feedings, 10);

    const totalOz = ( ( (lbs * 16) + oz) / 6 );

    let value =  (totalOz > 30 ? 30 : totalOz) / bottles;

    if (isMl) value *= 30;

    return value.toFixed(2);
};

const Calculator = () => {

    const [calculation, setCalculation] = useState(0);
    const [fieldLbs, setFieldLbs] = useState(10);
    const [fieldOz, setFieldOz] = useState(8);
    const [fieldFeedings, setFieldFeedings] = useState(8);
    const [fieldAge, setFieldAge] = useState(3);
    const [fieldAgeUnit, setFieldAgeUnit] = useState('month');
    const [error, setError] = useState(null);

    const updateFieldLbs = (event) => setFieldLbs(event.target.value);
    const updateFieldOz = (event) => setFieldOz(event.target.value);
    const updateFieldFeedings = (event) => setFieldFeedings(event.target.value);
    const updateFieldAge = (event) => setFieldAge(event.target.value);
    const updateFieldAgeUnit = (event) => setFieldAgeUnit(event.target.value);

    useEffect(() => {
        // Error checking
        if (fieldLbs < CONFIG.minWeight) {
            setError(errors.minWeight);
            return;
        }
        if (fieldLbs > CONFIG.maxWeight) {
            setError(errors.maxWeight);
            return;
        }
        if (fieldOz < CONFIG.minWeightOunces) {
            setError(errors.minWeightOunces);
            return;
        }
        if (fieldOz > CONFIG.maxWeightOunces) {
            setError(errors.maxWeightOunces);
            return;
        }
        if (fieldFeedings < CONFIG.minFeedings) {
            setError(errors.minFeedings);
            return;          
        }
        if (fieldFeedings > CONFIG.maxFeedings) {
            setError(errors.maxFeedings);
            return;          
        }
        setError(null);
        setCalculation(milkCalculation({lbs: fieldLbs, oz: fieldOz}, fieldFeedings));
      }, [fieldLbs, fieldOz, fieldFeedings]);


// TODO Allow for ml
// TODO Allow kg?

    return (
        <form>
            <fieldset className="form-group">
                <legend>Feedings Per Day</legend>
                <label>
                    <input type="number" id="form-feedings" name="feedings" min={CONFIG.minFeedings} max={CONFIG.maxFeedings} value={fieldFeedings} onChange={updateFieldFeedings} />
                    feedings
                </label>
            </fieldset>

            <fieldset className="form-group">
                <legend>Baby's Weight</legend>
                <label>
                    <input type="number" id="form-weight-lbs" name="lbs" min={CONFIG.minWeight} max={CONFIG.maxWeight} value={fieldLbs} onChange={updateFieldLbs} />
                    lbs
                </label>
                <label>
                    <input type="number" id="form-weight-oz" name="oz" min={CONFIG.minWeightOunces} max={CONFIG.maxWeightOunces} value={fieldOz} onChange={updateFieldOz} />
                    oz
                </label>
            </fieldset>

            <fieldset className="form-group" disabled hidden>
                <legend>Baby's Age</legend>
                <label>
                    <input type="number" id="form-age" name="age" min={CONFIG.minAge} value={fieldAge} onChange={updateFieldAge} />
                    { /* need a label here of some sort */}
                </label>
                <label>
                    <input type="radio" id="form-age-months" name="age-unit" value="month"  checked={fieldAgeUnit === "month"} onChange={updateFieldAgeUnit} />
                    months
                </label>
                <label>
                    <input type="radio" id="form-age-weeks" name="age-unit" value="week"  checked={fieldAgeUnit === "week"} onChange={updateFieldAgeUnit} />
                    weeks
                </label>
            </fieldset>

            <div className="result">
                {error ? 
                    <>
                        <i role="presentation">⚠️</i>
                        <p><strong>We're having trouble calculating.</strong> <br/>{error}</p>
                    </>
                        :
                    <>
                        <i role="presentation">🍼</i>
                        <p><output>{ calculation }oz</output> per bottle</p>
                    </>
                }
            </div>
        </form>
    );
}

export default Calculator;