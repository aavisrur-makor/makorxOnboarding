export default {
  form1: {
    grid1: [
      {
        id: "company_id",
        label: "Company",
        size: 12,
        type: "auto-complete",
        isRequired: true,
      },
      {
        id: "company_name",
        label: "Legal Entity Name",
        size: 12,
        type: "text",
        isRequired: true,
      },
      {
        id: "LEI",
        label: "Company LEI",
        size: 12,
        type: "text",
        isRequired: false,
      },
    ],
    grid2: [
      {
        id: "address",
        label: "Address",
        size: 12,
        type: "text",
        isRequired: false,
      },
      {
        id: "country_id",
        label: "Country",
        size: 12,
        type: "auto-complete",
        isRequired: true,
      },
      {
        id: "us_state_id",
        label: "State",
        size: 12,
        type: "auto-complete",
        isRequired: false,
      },
    ],
    grid3: [
      {
        id: "regulator_id",
        label: "Regulator",
        size: 12,
        type: "auto-complete",
        isRequired: false,
      },
      {
        id: "regulation_number",
        label: "Regulation Number",
        size: 12,
        type: "text",
        isRequired: false,
      },
      {
        id: "comment",
        label: "Comment",
        size: 12,
        type: "textarea",
        isRequired: false,
      },
      {
        id: "company_asset",
        label: "Assets",
        size: 12,
        type: "checkboxArray",
        isRequired: true,
      },
      {
        id: "contact_position_id",
        label: "Position",
        size: 12,
        type: "auto-complete",
        isRequired: false,
      },
      {
        id: "contact_name",
        label: "Name",
        size: 12,
        type: "text",
        isRequired: false,
      },
      {
        id: "contact_email",
        label: "Email",
        size: 12,
        type: "text",
        isRequired: true,
      },
    ],
  },
  form2: [
    {
      id: "certificate_of_incorporation",
      label: "CERTIFICATE OF INCORPORATION",
    },
    {
      id: "articles_of_association",
      label: "ARTICLES OF ASSOCIATION / MEMORANDUM OF ASSOCIATION",
    },
    { id: "proof_of_business_address", label: "DIRECTOR'S NAME" },
    {
      id: "directors_list",
      label: "PROOF OF REGISTERED OR PRINCIPAL BUSINESS ADDRESS",
    },
    {
      id: "shareholders_list",
      label: "COMPANY DIRECTORS' LIST DATED AND SIGNED",
    },
    { id: "source_of_funds", label: "SOURCE OF FUNDS/WEALTH" },
    {
      id: "chart_of_organisation",
      label: "OWNERSHIP STRUCTURE SCHEME/ORGANIZATIONAL CHART OR EQUIVALENT",
    },
    { id: "aml_policy", label: "COMPLIANCE KYC AML POLICY" },
    {
      id: "financial_statement",
      label: "LATEST FINANCIAL STATEMENT (IF AVAILABLE)",
    },
    { id: "PROOFS", label: "DIRECTOR'S NAME" },
  ],
};

// select	mandatory	company	onboarding.company_entity_id
// input(type="text")	mandatory	legal entity name	onboarding.legal_entity_name
// input(type="text")		LEI	onboarding.legal_entity_identifier
// input(type="text")		address	onboarding.registration_gapi_location
// select	mandatory	country	onboarding.country
// select		state	onboarding.us_state
// input(type="text")		regulator	onboarding.regulator
// input(type="text")		regulation number	onboarding.regulation_number
// textarea		comment	onboarding.activity_description
// input(type="checkbox")	mandatory	products	onboarding.onboarding_has_company_entity_asset
// select		contact - position	onboarding.onboarding_contact.contact_position
// input		contact - name	onboarding.onboarding_contact.name
// input(type="email")	mandatory	contact - contact info	onboarding.onboarding_contact.email
