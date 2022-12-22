export const repoPageSelectors =
{
    // create new repo selectors
    newRepoSelectors: {
        newRepoNameSelector: '#repository_name',
        validiationSelector: '#input-check-215',
        repository_description: '#repository_description',
        repository_visibility_public: '#repository_visibility_public',
        repository_visibility_private: '#repository_visibility_private',
        createRepoButton: '    Create repository',
    },

    // under settings tab
    settingsTab: {
        settingsTab: '#settings-tab',
        renameField: '#rename-field',
        renameButtonText: 'Rename',
        deleteConfirmationLabel: '[aria-label*="delete"]',
        projectTab: '#projects-tab',
        linkOrAddProjectButton: '#link-or-add-project-button',
        searhForProjectButton: '#query',
        ChangeVisibilityButtonText: '    Change visibility',
        ChangeVisibilityToButtonRegex: /\s+Change to [a-zA-Z]+/i,
        ChangeRepoConfirmButton: '.Button-label',
        deleteLabelTest:/.*(delete this repository)/,
        deleteButtonText: 'Delete this repository',
    },
    
    // code button area to clone repo
    codeTab: '#code-tab',
    codeButtonForLink: 'summary.btn-primary',
    localTabButton: '#local-tab',
    cloneUrlLoctors: '#empty-setup-clone-url'
}