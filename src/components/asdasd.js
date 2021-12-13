import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as companyActions from '../../redux/Company/companySlice'
import { useLocation, useParams } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core'
import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg'
import * as actionSnackBar from "../../redux/SnackBar/action";
import { useStyles, CustomTextField, StyledAutoComplete  } from '../../styles/UiForm'

import InputAdornment from '@material-ui/core/InputAdornment';
import { ReactComponent as MagnifingGlassIcon } from '../../assets/icons/Magnifing-glass.svg';
import { useTheme, useMediaQuery } from '@material-ui/core'

// axios
import axios from 'axios'
import { BASE_URL, END_POINT, ASSETS_URL } from '../../utils/constans'

function Step1(props) {
  const { initialSubDomain, pristineSubDomain, setPristineSubDomain } = props;
  const classes = useStyles()
  const location = useLocation()
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const params = useParams()
  const languages = useSelector(state => state.utils.utils.language)
  const countries = useSelector(state => state.utils.utils.country)
  const company = useSelector((state) => state.company.company);
  const subDomainAvailability = useSelector(state => state.company.domainAvailability)
  const galaxyFold = useMediaQuery('(max-width:320px)');

  const dispatch = useDispatch()

  const handleChange = (e, key) => {
    dispatch(companyActions.setCompanyProperty(
      { mainProperty: 'companyDetails', subProperty: key, updatedValue: e.target.value }))
  }
  const changeValue = (newValue, key) => {
    dispatch(companyActions.setCompanyListsValue(
      { mainProperty: 'companyDetails', subProperty: key, updatedValue: newValue }))
  }
  const changeInputValue = (newValue, key) => {
    dispatch(companyActions.setCompanyListsInput(
      { mainProperty: 'companyDetails', subProperty: key, updatedValue: newValue }))
  }

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      axios.put(BASE_URL + END_POINT.FILE, formData).then((res) => {
        if (res.status === 200 && res.data.file_name) {
          // update local state with response
          //   setUploadedLogo(res.data.file_name)
          // update redux state
          dispatch(
            companyActions.setCompanyProperty({
              mainProperty: 'companyDetails',
              subProperty: 'logo',
              updatedValue: res.data.file_name
            })
          )
        }
      }).catch((error) => {
        dispatch(
          actionSnackBar.setSnackBar(
            "error",
            "Something went wrong",
            3000
          )
        )
      })
    }
  }

  const handleSubDomainChange = (e, key) => {
    const re = /^\w[\w-]{0,60}\w$/
    handleChange(e, key)
    setPristineSubDomain(false)
    if (!(re.test(String(e.target.value).toLowerCase()))) {
      dispatch(companyActions.setDomainAvailability(false))
    } else if (e.target.value === initialSubDomain && e.target.value !== '') {
      dispatch(companyActions.setDomainAvailability(true))
    } else {
      dispatch(companyActions.checkDomainName(e.target.value))
    }
  }

  return (
    company && countries && languages && <form>
      <Grid container spacing={3} className={classes.stepRoot}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12} style={{ paddingTop: 0 }}>
              <CustomTextField
                size='small'
                autoComplete='off'
                fullWidth
                id="legalName"
                value={company.companyDetails.legalName}
                label="Legal Name"
                placeholder="Legal Name"
                onChange={(e) => { handleChange(e, e.target.id) }}
                // placeholder="Full Company Name"
                required
              />
            </Grid>

            <Grid item sm={6} xs={12} style={{ paddingTop: 0 }}>
              <CustomTextField
                size='small'
                autoComplete='off'
                fullWidth
                id="nickName"
                label="Display Name"
                placeholder="Display Name"
                value={company.companyDetails.nickName}
                onChange={(e) => { handleChange(e, e.target.id) }}
                // placeholder="Display Name"
                required />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} style={{ marginTop: 25 }}>
            <Grid item sm={6} xs={12} style={{ paddingTop: 0 }}>
              {/* <Typography className={classes.inputTitle}>Country *</Typography> */}
              <StyledAutoComplete
                id="country"
                options={countries && countries}
                autoHighlight
                // autoComplete='off'
                popupIcon={<MagnifingGlassIcon className={classes.magnifier} />}
                value={company.companyDetails.country.value}
                inputValue={company.companyDetails.country.inputValue}
                getOptionLabel={(option) => option.name || ''}
                getOptionSelected={(option, value) =>
                  option.name === value
                }
                onChange={(e, newValue) => changeValue(newValue, 'country')}
                onInputChange={(event, newInputValue) => {
                  // console.log(newInputValue, 'newInputvlue')
                  changeInputValue(newInputValue, 'country')
                }}
                // renderOption={(props, option) => (
                //     <React.Fragment>
                //     <span>{(option.name)}</span>
                //     </React.Fragment>
                // )}
                renderInput={(params) => {
                  return (
                    <CustomTextField
                      placeholder="Country"
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        // autoComplete: 'new-password',
                      }}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12} style={{ paddingTop: 0 }}>
              {/* <Typography className={classes.inputTitle}>Language *</Typography> */}
              <StyledAutoComplete
                id="language"
                popupIcon={<MagnifingGlassIcon className={classes.magnifier} />}

                options={languages && languages}
                autoHighlight
                value={company.companyDetails.language.value}
                inputValue={company.companyDetails.language.inputValue}
                getOptionLabel={(option) => option.name || ''}
                getOptionSelected={(option, value) =>
                  option.name === value
                }
                onChange={(e, newValue) => changeValue(newValue, 'language')}
                onInputChange={(event, newInputValue) => {
                  changeInputValue(newInputValue, 'language')
                }}
                // renderOption={(props, option) => (
                //     <React.Fragment>
                //     <span>{(option.name)}</span>
                //     </React.Fragment>
                // )}
                renderInput={(params) => (
                  <CustomTextField
                    placeholder="Language"
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      // autoComplete: 'new-password',
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item sm={6}>
                    <inputLabel className={classes.inputLabel}>URL</inputLabel>
                </Grid>
                <Grid item sm={6}>
                    <inputLabel className={classes.inputLabel}>Logo</inputLabel>
                </Grid> */}
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <Grid container spacing={2} justifyContent='center' style={{ height: '80px' }}>
            <Grid item sm={6} style={{ paddingTop: 19 }}>
              <CustomTextField
                size='small'
                autoComplete='off'
                error={!pristineSubDomain && !subDomainAvailability}
                helperText={(!pristineSubDomain && !subDomainAvailability) && 'invalid sub domain'}
                fullWidth
                id="subDomain"
                value={company.companyDetails.subDomain}
                placeholder="subdomain"
                onChange={(e) => { handleSubDomainChange(e, "subDomain") }}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                  endAdornment: <InputAdornment position="end">.enigma-x.app</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={12}>
        <Grid container justify='center'>
        {/* <Grid item xs={xs ? 12 : 6}> */}
          {/* <Grid container spacing={2} justifyContent={xs && 'space-between'} > */}
            <Grid item xs={12} sm={6}>
              <Grid
                container
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                className={classes.subContainer}
              >
                {company.companyDetails.logo ?
                <Grid item xs={galaxyFold ? 4 : 6}>
                  <Grid container justifyContent='center' className={classes.withLogo} >
                    {/* <Grid container > */}
                      <Grid item style={{ margin: 'auto' }} >
                        40px x 60px
                      </Grid>
                      <Grid item className={classes.uploadedLogo}>
                        {company.companyDetails.logo !== '' && <img alt='logo' src={encodeURI(ASSETS_URL + company.companyDetails.logo)} className={classes.preview} />}
                      </Grid>
                      <Grid item className={classes.logoImageName}>
                        {company.companyDetails.logo !== '' && company.companyDetails.logo}
                      </Grid>
                    {/* </Grid> */}
                    </Grid>
                  </Grid>
                  :
                  <Grid item xs={galaxyFold ? 4 : 6}>
                    <Grid container justifyContent='center' alignItems='center' className={classes.emptyLogo}>
                      {/* <Grid container justifyContent='center'> */}
                        <Grid item >
                          40px x 60px
                        {/* </Grid> */}
                      </Grid>
                    </Grid>
                  </Grid>
                }
                <Grid item xs={galaxyFold ? 4 : 6}>
                <Grid container className={classes.uploadLogoButton} direction='column' justifyContent='center' alignItems='center'>
                  {/* <Grid> */}
                    <input
                      accept='image/x-png,image/jpeg,image/svg+xml'
                      style={{ display: 'none' }}
                      id='logo'
                      type='file'
                      name='file_name'
                      onChange={handleUpload}
                    />
                    <label htmlFor='logo'>
                      <Grid container justifyContent="center" alignItems="center"
                        style={{
                          cursor: 'pointer',
                          //marginLeft: 5
                        }}
                      >
                        <UploadIcon />
                        <Typography variant='subtitle1' className={classes.logoTypography}>
                          Logo
                        </Typography>
                      </Grid>
                    </label>
                  {/* </Grid> */}

                  <Grid item>
                    .png .jpg .svg
                  </Grid>
                  </Grid>
                
            </Grid>
            </Grid>
            </Grid>
          {/* </Grid> */}
        {/* </Grid> */}
        </Grid>
        </Grid>
      </Grid>
    </form >
  )
}

export default Step1