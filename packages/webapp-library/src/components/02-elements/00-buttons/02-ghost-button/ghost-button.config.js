module.exports = {
  variants: [
    {
      name: "small"
    },
    {
      name: "alert"
    },
    {
      name: "alert-small"
    },
    {
      name: "disabled"
    },
    {
      name: "variant-tags"
    },
    {
      name: "testing",
      notes: `
## Testing Component

This component should represent all possible permutations of this component grouping and will be used in visual regression testing.

If you edit this template directly or update the framework in a way that will change these styles, you should expect a GI test to fail.
      `
    }
  ]
}