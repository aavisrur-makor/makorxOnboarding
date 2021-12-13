import { Grid, Typography } from '@material-ui/core';

const isNotEmptyValue = (value) => {
  console.log('TRIM', value);
  return value?.trim() !== '';
};

const findNonEmptyValues = (state) => {
  let nonEmptyFields = 0;
  Object.entries(state).forEach(([key, value]) => {
    if (typeof value === 'string') {
      isNotEmptyValue(value) && nonEmptyFields++;
    } else if (value) {
      nonEmptyFields++;
    }
  });

  return nonEmptyFields;
};

const createTermsContent = (sections, classes) => {
  let finalArray = [];
  Object.keys(sections).forEach((sectionNum, i) => {
    finalArray.push(
      handleEntireSection(sectionNum, sections[sectionNum], classes)
    );
  });

  return finalArray;
};

const handleEntireSection = (sectionNum, section, classes) => {
  let finalArray = [];
  let hasContentKey = false;

  Object.keys(section).forEach((key) => {
    if (key === 'title') {
      finalArray.push(
        <Grid item>
          <Typography className={classes.termsOfUseSectionTitle}>
            {sectionNum}. {section[key]}
          </Typography>
        </Grid>
      );
    } else if (key === 'content') {
      hasContentKey = true;
      finalArray.push(
        <Grid item>
          <Typography className={classes.termsOfUseSection}>
            {section[key]}
          </Typography>
        </Grid>
      );
    } else if (Number.isInteger(Number(key))) {
      if (typeof section[key] === 'string')
        finalArray.push(
          <Grid item>
            <Typography className={classes.termsOfUseSection}>
              <Typography
                className={classes.termsOfUseSectionNum}
                component='span'
              >
                {sectionNum}.{key}.
              </Typography>
              {section[key]}
            </Typography>
          </Grid>
        );
      else
        finalArray.push(
          <Grid item>
            <Grid container>
              {handleSubSection(sectionNum, key, section[key], classes)}
            </Grid>
          </Grid>
          // <Typography><Grid>
          // </Typography>
        );
    }
  });
  if (!hasContentKey) finalArray.unshift(finalArray.pop());
  return finalArray;
};

const handleSubSection = (sectionNum, subSectionNum, subSection, classes) => {
  let finalArray = [];

  Object.keys(subSection).forEach((key) => {
    if (key === 'title') {
      finalArray.push(
        <Grid item>
          <Typography>
            {sectionNum}.{subSectionNum} {subSection[key]}
          </Typography>
        </Grid>
      );
    } else
      finalArray.push(
        <Grid item>
          <Typography>
            <Typography className={classes.termsOfUseSectionNum}>
              {sectionNum}.{subSectionNum}.{key}.
            </Typography>{' '}
            {subSection[key]}
          </Typography>
        </Grid>
      );
  });
  finalArray.unshift(finalArray.pop());
  return finalArray;
};

const createTermsAppendixContent = (appendix, classes) => {
  let finalArray = [];
  Object.keys(appendix).forEach((sectionNum, i) => {
    if (sectionNum.includes('A - ')) {
      if (typeof appendix[sectionNum] === 'string') {
        finalArray.push(
          <Grid item>
            <Typography className={classes.termsOfUseSection}>
              <Typography
                className={classes.termsOfUseSectionTitle}
                component='span'
              >
                {sectionNum.replace(' - ', '.')}
                {'. '}
              </Typography>
              {appendix[sectionNum]}
            </Typography>
          </Grid>
        );
      } else if (typeof appendix[sectionNum] === 'object')
        finalArray.push(
          handleAppendixSubSection(appendix[sectionNum], classes)
        );
    }
  });

  return finalArray;
};

const handleAppendixSubSection = (subSections, classes) => {
  let finalArray = [];
  Object.keys(subSections).forEach((sectionNum, i) => {
    if (sectionNum === 'content') {
      finalArray.push(
        <Grid item>
          <Typography className={classes.termsOfUseSection}>
            <Typography
              className={classes.termsOfUseSectionTitle}
              component='span'
            >
              {'A.9 '}
            </Typography>
            {subSections[sectionNum]}
          </Typography>
        </Grid>
      );
    } else {
      finalArray.push(
        <Grid item>
          <Typography className={classes.termsOfUseSection}>
            {`(${sectionNum}) `}
            {subSections[sectionNum]}
          </Typography>
        </Grid>
      );
    }
  });

  return finalArray;
};

export { createTermsAppendixContent, createTermsContent };
