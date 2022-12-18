export const repoPageSelectors =
{
    // create new repo selectors
    newRepoNameSelector: '#repository_name',
    validiationSelector: '#input-check-215',
    repository_description: '#repository_description',
    repository_visibility_public: '#repository_visibility_public',
    repository_visibility_private: '#repository_visibility_private',

    // under settings tab
    settingsTab: '#settings-tab',
    createRepoButton: '[data-disable-with="Creating repository&hellip;"]',
    renameField: '#rename-field',
    renameButtonText: 'Rename',
    deleteConfirmationLabel: '[aria-label="Type in the name of the repository to confirm that you want to delete this repository."]',
    projectTab: '#projects-tab',
    linkOrAddProjectButton: '#link-or-add-project-button',
    searhForProjectButton: '#query',
    ChangeVisibilityButtonText: '    Change visibility',
    ChangeVisibilityToButtonRegex: /\s+Change to [a-zA-Z]+/i,
    ChangeRepoConfirmButton: '.Button-label',
    
    // code button area to clone repo
    codeTab: '#code-tab',
    codeButtonForLink: 'summary.btn-primary',
    localTabButton: '#local-tab',
    cloneUrlLoctors: '#empty-setup-clone-url'
}